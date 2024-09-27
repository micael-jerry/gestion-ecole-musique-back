import { BadRequestException, Injectable } from '@nestjs/common';
import { UserWithIncluded } from '../user/types/user-with-included.type';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserArchiveService {
  private static userInclude = { role: true, courses: true };

  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
  ) {}

  async findAll(
    roleName?: string[],
    courseId?: string,
    criteria?: string,
  ): Promise<UserWithIncluded[]> {
    return this.userService.findAll(roleName, courseId, criteria, true);
  }

  async findById(id: string): Promise<UserWithIncluded> {
    return this.userService.findById(id, true);
  }

  async remove(
    authenticatedUser: JwtPayloadType,
    id: string,
  ): Promise<UserWithIncluded> {
    return this.userService.remove(authenticatedUser, id, true);
  }

  async archive(
    authenticatedUser: JwtPayloadType,
    id: string,
  ): Promise<UserWithIncluded> {
    const user = await this.userService.findById(id);
    if (user && authenticatedUser.userId === user.id) {
      throw new BadRequestException('You cannot archive your account yourself');
    }
    return this.prismaService.user.update({
      where: { id: id },
      data: { isArchive: true },
      include: UserArchiveService.userInclude,
    });
  }

  async unarchive(id: string): Promise<UserWithIncluded> {
    await this.findById(id);
    return this.prismaService.user.update({
      where: { id: id },
      data: { isArchive: false },
      include: UserArchiveService.userInclude,
    });
  }
}
