import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserInput } from '../dto/create-user.input';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserInput } from '../dto/update-user.input';

@Injectable()
export class UserValidator {
  constructor(private readonly prismaService: PrismaService) {}
  async createUserValidator(user: CreateUserInput) {
    if (user.courses && user.courses.length > 0) {
      await this.validateCourse(user.courses.map((c) => c.id));
    }
  }

  async updateUserValidator(user: UpdateUserInput) {
    if (user.courses) {
      if (user.courses.connect && user.courses.connect.length > 0) {
        await this.validateCourse(user.courses.connect.map((c) => c.id));
      }
      if (user.courses.disconnect && user.courses.disconnect.length > 0) {
        await this.validateCourse(user.courses.disconnect.map((c) => c.id));
      }
    }
  }

  private async validateCourse(coursesIdList: string[]) {
    const count = await this.prismaService.course.count({
      where: { id: { in: coursesIdList }, isDeleted: false },
    });
    if (count !== coursesIdList.length) {
      throw new BadRequestException('Invalid course IDs');
    }
  }
}
