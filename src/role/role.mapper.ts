import { Injectable } from '@nestjs/common';
import { RoleWithIncluded } from './types/role-with-included.type';
import { RoleType } from './entities/role.entity';

@Injectable()
export class RoleMapper {
  toGraphql(entity: RoleWithIncluded): RoleType {
    return { users: entity.users.filter((r) => !r.isDeleted), ...entity };
  }
}
