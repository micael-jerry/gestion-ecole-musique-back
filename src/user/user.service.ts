import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { PictureService } from '../picture/picture.service';
import { RoleService } from '../role/role.service';
import { UpdateUserInput } from './dto/update-user.input';
import { RoleType } from '../role/entities/role.entity';
import * as bcrypt from 'bcrypt';
import { UserWithIncluded } from './types/user-with-included.type';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';
import { PictureInput } from 'src/picture/dto/picture.input';

@Injectable()
export class UserService {
  private static userInclude = { role: true, courses: true };

  constructor(
    private readonly prismaService: PrismaService,
    private readonly pictureService: PictureService,
    private readonly roleService: RoleService,
  ) {}

  async findAll(
    roleName?: string[],
    courseId?: string,
    criteria?: string,
    isArchive: boolean = false,
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
  ): Promise<UserWithIncluded> {
    const userRole = await this.roleService.getRoleByIdOrName(role);
    const pictureUrl: string | null = await this.pictureService
      .upload(picture)
      .then((res) => res)
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });

    return this.prismaService.user.create({
      data: {
        password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
        roleId: userRole.id,
        picture: pictureUrl,
        courses: { connect: courses || [] },
        ...createUserInput,
      },
      include: UserService.userInclude,
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
    return this.prismaService.$transaction(async () => {
      await this.prismaService.user.update({
        where: { id: id },
        data: { courses: { set: [] } },
      });
      return this.prismaService.user.delete({
        where: { id: id },
        include: UserService.userInclude,
      });
    });
  }

  async update(
    { role, courses, password, ...updateUserInput }: UpdateUserInput,
    picture: PictureInput,
  ): Promise<UserWithIncluded> {
    const user = await this.findById(updateUserInput.id);
    let newUserRole: RoleType | null = null;
    const newPicture: string = await this.pictureService.update(
      user.picture,
      picture,
    );

    if (role && (role.id || role.name)) {
      newUserRole = await this.roleService.getRoleByIdOrName(role);
    }

    return this.prismaService.user.update({
      where: { id: updateUserInput.id },
      data: {
        password: password
          ? bcrypt.hashSync(password, bcrypt.genSaltSync())
          : user.password,
        roleId: newUserRole ? newUserRole.id : user.roleId,
        picture: newPicture || user.picture,
        courses: {
          connect: courses?.connect || [],
          disconnect: courses?.disconnect || [],
        },
        ...updateUserInput,
      },
      include: UserService.userInclude,
    });
  }
}
