import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { RoleType } from './entities/role.entity';
import { RoleService } from './role.service';

@Resolver(() => RoleType)
export class RoleResolver {
  constructor(private roleService: RoleService) {}
  @Query(() => [RoleType])
  getAllRoles() {
    return this.roleService.getAllRoles();
  }

  @Mutation(() => RoleType)
  createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return this.roleService.createRole(createRoleInput);
  }

  @Query(() => RoleType)
  getRoleById(@Args('id') id: string) {
    return this.roleService.getRoleById(id);
  }

  @Mutation(() => RoleType)
  updateRole(@Args('updateRoleInput') updateRoleInput: UpdateRoleInput) {
    return this.roleService.updateRole(updateRoleInput);
  }

  @Query(() => RoleType)
  deleteRole(@Args('id') id: string) {
    return this.roleService.deleteRole(id);
  }
}
