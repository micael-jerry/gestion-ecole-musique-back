import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserWithIncluded } from './types/user-with-included.type';

@Injectable()
export class UserMapper {
  toGraphql(entity: UserWithIncluded): User {
    return { courses: entity.courses.filter((c) => !c.isDeleted), ...entity };
  }
}
