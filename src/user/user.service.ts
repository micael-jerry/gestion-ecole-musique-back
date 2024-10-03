import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityType, OperationType, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';
import { HistoryService } from '../history/history.service';
import { PictureInput } from '../picture/dto/picture.input';
import { PictureService } from '../picture/picture.service';
import { PrismaService } from '../prisma/prisma.service';
import { RoleType } from '../role/entities/role.entity';
import { RoleService } from '../role/role.service';
import { CreateUserInput } from './dto/create-user.input';
import { PaginationInput } from './dto/pagination.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserWithIncluded } from './types/user-with-included.type';

@Injectable()
export class UserService {
  private static readonly userInclude = {
    role: true,
    courses: true,
    payments: true,
  };

  constructor(
    private readonly prismaService: PrismaService,
    private readonly pictureService: PictureService,
    private readonly roleService: RoleService,
    private readonly historyService: HistoryService,
  ) {}

  async findAll(
    roleName?: string[],
    courseId?: string,
    criteria?: string,
    isArchive: boolean = false,
    pagination?: PaginationInput,
  ): Promise<UserWithIncluded[]> {
    const userWhereInput: Prisma.UserWhereInput = {};
    userWhereInput.isArchive = isArchive;
    if (roleName && roleName.length > 0) {
      userWhereInput.role = { name: { in: roleName } };
    }
    if (courseId && courseId.length > 0) {
      userWhereInput.courses = { some: { id: courseId } };
    }
    if (criteria)
      userWhereInput.OR = [
        { firstname: { contains: criteria, mode: 'insensitive' } },
        { lastname: { contains: criteria, mode: 'insensitive' } },
        { email: { contains: criteria, mode: 'insensitive' } },
      ];

    return this.prismaService.user.findMany({
      where: userWhereInput,
      include: UserService.userInclude,
      orderBy: { lastname: 'asc' },
      skip: pagination ? pagination.page * pagination.pageSize : undefined,
      take: pagination ? pagination.pageSize : undefined,
    });
  }

  async findById(
    id: string,
    isArchive: boolean = false,
  ): Promise<UserWithIncluded> {
    const user = await this.prismaService.user.findUnique({
      where: { id: id, isArchive: isArchive },
      include: UserService.userInclude,
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  // Only used by auth
  async findByEmail(email: string): Promise<UserWithIncluded> {
    const user = await this.prismaService.user.findUnique({
      where: { email: email, isArchive: false },
      include: UserService.userInclude,
    });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async create(
    { role, courses, password, ...createUserInput }: CreateUserInput,
    picture: PictureInput,
    authenticatedUser: JwtPayloadType,
  ): Promise<UserWithIncluded> {
    const userRole = await this.roleService.getRoleByIdOrName(role);
    const pictureUrl: string | null = await this.pictureService
      .upload(picture)
      .then((res) => res)
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });

    return this.prismaService.$transaction(async (tx) => {
      const created = await tx.user.create({
        data: {
          password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
          roleId: userRole.id,
          picture: pictureUrl,
          courses: { connect: courses || [] },
          ...createUserInput,
        },
        include: UserService.userInclude,
      });
      await this.historyService.create(
        {
          entityId: created.id,
          userId: authenticatedUser.userId,
          entityType: EntityType.USER,
          operationType: OperationType.CREATE,
        },
        tx,
      );
      return created;
    });
  }

  async remove(
    authenticatedUser: JwtPayloadType,
    id: string,
    isArchive: boolean = false,
  ): Promise<UserWithIncluded> {
    const user = await this.findById(id, isArchive);
    if (user) {
      if (authenticatedUser.userId === user.id) {
        throw new BadRequestException(
          'You cannot delete your account yourself',
        );
      }
      this.pictureService.remove(user.picture);
    }
    return await this.prismaService.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: id },
        data: { courses: { set: [] } },
      });
      const userDeleted = await tx.user.delete({
        where: { id: id },
        include: UserService.userInclude,
      });
      await this.historyService.create(
        {
          entityId: userDeleted.id,
          userId: authenticatedUser.userId,
          entityType: EntityType.USER,
          operationType: OperationType.DELETE,
        },
        tx,
      );
      return userDeleted;
    });
  }

  async update(
    { role, courses, password, ...updateUserInput }: UpdateUserInput,
    picture: PictureInput,
    authenticatedUser: JwtPayloadType,
  ): Promise<UserWithIncluded> {
    const user = await this.findById(updateUserInput.id);
    let newUserRole: RoleType | null = null;
    const newPicture: string | null = await this.pictureService.update(
      user.picture,
      picture,
    );
    if (role && (role.id || role.name)) {
      newUserRole = await this.roleService.getRoleByIdOrName(role);
    }

    return this.prismaService.$transaction(async (tx) => {
      const userUpdated = await tx.user.update({
        where: { id: updateUserInput.id },
        data: {
          password: password
            ? bcrypt.hashSync(password, bcrypt.genSaltSync())
            : user.password,
          roleId: newUserRole ? newUserRole.id : user.roleId,
          picture: newPicture ?? user.picture,
          courses: {
            connect: courses?.connect || [],
            disconnect: courses?.disconnect || [],
          },
          ...updateUserInput,
        },
        include: UserService.userInclude,
      });
      await this.historyService.create(
        {
          entityId: userUpdated.id,
          userId: authenticatedUser.userId,
          entityType: EntityType.USER,
          operationType: OperationType.UPDATE,
        },
        tx,
      );
      return userUpdated;
    });
  }
}
