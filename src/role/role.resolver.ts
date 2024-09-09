import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { RoleType } from './entities/role.entity';
import { RoleService } from './role.service';
import { Actions } from '../auth/decorator/set-metadata-action.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ActionGuard } from '../auth/guard/action.guard';

@Resolver(() => RoleType)
export class RoleResolver {
  constructor(private roleService: RoleService) {}

  @Actions('GET_ROLE')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => [RoleType])
  getAllRoles() {
    return this.roleService.getAllRoles();
  }

  @Actions('CREATE_ROLE')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => RoleType)
  createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return this.roleService.createRole(createRoleInput);
  }

  @Actions('GET_ROLE')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => RoleType)
  getRoleById(@Args('id') id: string) {
    return this.roleService.getRoleById(id);
  }

  @Actions('UPDATE_ROLE')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => RoleType)
  updateRole(@Args('updateRoleInput') updateRoleInput: UpdateRoleInput) {
    return this.roleService.updateRole(updateRoleInput);
  }

  @Actions('DELETE_ROLE')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => RoleType)
  deleteRole(@Args('id') id: string) {
    return this.roleService.deleteRole(id);
  }
}
