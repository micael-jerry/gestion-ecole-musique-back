import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { PictureService } from '../picture/picture.service';
import { RoleService } from '../role/role.service';
import * as Upload from 'graphql-upload/Upload.js';
import { UpdateUserInput } from './dto/update-user.input';
import { RoleType } from '../role/entities/role.entity';
import * as bcrypt from 'bcrypt';
import { UserWithIncluded } from './types/user-with-included.type';

@Injectable()
export class UserService {
  private static userInclude = { role: true, musicCategories: true };

  constructor(
    private readonly prismaService: PrismaService,
    private readonly pictureService: PictureService,
    private readonly roleService: RoleService,
  ) {}

  async findAll(
    roleName?: string,
    criteria?: string,
  ): Promise<UserWithIncluded[]> {
    const userWhereInput: Prisma.UserWhereInput = {};
    if (roleName) userWhereInput.role = { name: roleName };
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

  async findById(id: string): Promise<UserWithIncluded> {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
      include: UserService.userInclude,
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserWithIncluded> {
    const user = await this.prismaService.user.findUnique({
      where: { email: email },
      include: UserService.userInclude,
    });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async create(
    { role, musicCategories, password, ...createUserInput }: CreateUserInput,
    picture: Upload,
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
        musicCategories: { connect: musicCategories || [] },
        ...createUserInput,
      },
      include: UserService.userInclude,
    });
  }

  async remove(id: string): Promise<UserWithIncluded> {
    const user = await this.findById(id);
    if (user) {
      this.pictureService.remove(user.picture);
    }
    return this.prismaService.$transaction(async () => {
      await this.prismaService.user.update({
        where: { id: id },
        data: { musicCategories: { set: [] } },
      });
      return this.prismaService.user.delete({
        where: { id: id },
        include: UserService.userInclude,
      });
    });
  }

  async update(
    { role, musicCategories, password, ...updateUserInput }: UpdateUserInput,
    picture: Upload,
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
        musicCategories: {
          connect: musicCategories?.connect || [],
          disconnect: musicCategories?.disconnect || [],
        },
        ...updateUserInput,
      },
      include: UserService.userInclude,
    });
  }
}
