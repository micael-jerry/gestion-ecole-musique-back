import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityType, OperationType } from '@prisma/client';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';
import { HistoryService } from '../history/history.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserWithIncluded } from '../user/types/user-with-included.type';
import { UserService } from '../user/user.service';

@Injectable()
export class UserArchiveService {
  private static readonly userInclude = {
    role: true,
    courses: true,
    payments: true,
    timeSlots: true,
  };

  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
    private readonly historyService: HistoryService,
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
    return await this.prismaService.$transaction(async (tx) => {
      const userArchived = await tx.user.update({
        where: { id: id },
        data: { isArchive: true },
        include: UserArchiveService.userInclude,
      });
      await this.historyService.create(
        {
          entityId: userArchived.id,
          entityType: EntityType.USER,
          operationType: OperationType.ARCHIVE,
          userId: authenticatedUser.userId,
        },
        tx,
      );
      return userArchived;
    });
  }

  async unarchive(
    authenticatedUser: JwtPayloadType,
    id: string,
  ): Promise<UserWithIncluded> {
    await this.findById(id);
    return this.prismaService.$transaction(async (tx) => {
      const userUnarchived = await tx.user.update({
        where: { id: id },
        data: { isArchive: false },
        include: UserArchiveService.userInclude,
      });
      await this.historyService.create(
        {
          entityId: userUnarchived.id,
          entityType: EntityType.USER,
          operationType: OperationType.UNARCHIVE,
          userId: authenticatedUser.userId,
        },
        tx,
      );
      return userUnarchived;
    });
  }
}
