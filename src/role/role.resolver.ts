import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { RoleType } from './entities/role.entity';
import { RoleService } from './role.service';
import { Actions } from '../auth/decorator/set-metadata-action.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ActionGuard } from '../auth/guard/action.guard';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';

@Resolver(() => RoleType)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Actions('GET_ROLE')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => [RoleType])
  getAllRoles() {
    return this.roleService.getAllRoles();
  }

  @Actions('CREATE_ROLE')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => RoleType)
  createRole(
    @Context('user') user: JwtPayloadType,
    @Args('createRoleInput') createRoleInput: CreateRoleInput,
  ) {
    return this.roleService.createRole(createRoleInput, user);
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
  updateRole(
    @Context('user') user: JwtPayloadType,
    @Args('updateRoleInput') updateRoleInput: UpdateRoleInput,
  ) {
    return this.roleService.updateRole(updateRoleInput, user);
  }

  @Actions('DELETE_ROLE')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => RoleType)
  deleteRole(@Context('user') user: JwtPayloadType, @Args('id') id: string) {
    return this.roleService.deleteRole(id, user);
  }
}
