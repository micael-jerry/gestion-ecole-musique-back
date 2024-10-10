import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateRoleInput } from './dto/update-role.input';
import { RoleType } from './entities/role.entity';
import { RoleService } from './role.service';
import { Actions } from '../auth/decorator/set-metadata-action.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ActionGuard } from '../auth/guard/action.guard';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';
import { RoleMapper } from './role.mapper';

@Resolver(() => RoleType)
export class RoleResolver {
  constructor(
    private readonly roleService: RoleService,
    private readonly roleMapper: RoleMapper,
  ) {}

  @Actions('GET_ROLE')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => [RoleType])
  async getAllRoles(): Promise<RoleType[]> {
    return (await this.roleService.getAllRoles()).map((r) =>
      this.roleMapper.toGraphql(r),
    );
  }

  @Actions('GET_ROLE')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => RoleType)
  async getRoleById(@Args('id') id: string): Promise<RoleType> {
    return this.roleMapper.toGraphql(await this.roleService.getRoleById(id));
  }

  @Actions('UPDATE_ROLE')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => RoleType)
  async updateRole(
    @Context('user') user: JwtPayloadType,
    @Args('updateRoleInput') updateRoleInput: UpdateRoleInput,
  ): Promise<RoleType> {
    return this.roleMapper.toGraphql(
      await this.roleService.updateRole(updateRoleInput, user),
    );
  }
}
