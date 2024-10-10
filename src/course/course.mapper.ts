import { Injectable } from '@nestjs/common';
import { CourseWithIncluded } from './types/course-with-include.type';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseMapper {
  toGraphql(entity: CourseWithIncluded): Course {
    return { users: entity.users.filter((u) => !u.isDeleted), ...entity };
  }
}
