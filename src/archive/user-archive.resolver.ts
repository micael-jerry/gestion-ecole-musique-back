import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../user/entities/user.entity';
import { UserArchiveService } from './user-archive.service';
import { Actions } from '../auth/decorator/set-metadata-action.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ActionGuard } from '../auth/guard/action.guard';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';

@Resolver(() => User)
export class UserArchiveResolver {
  constructor(private readonly userArchiveService: UserArchiveService) {}

  @Actions('GET_USER_ARCHIVE')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => [User])
  findAllUserArchive(
    @Args({
      name: 'roleName',
      nullable: true,
      description:
        'if you want a list of users archive by role, enter the name of the role, or leave out the parameter',
    })
    roleName: string,
    @Args({
      name: 'criteria',
      nullable: true,
      description:
        'filter user arhive list by firstname OR lastname OR email (case insensitive)',
    })
    criteria: string,
  ) {
    return this.userArchiveService.findAll(roleName, criteria);
  }

  @Actions('GET_USER_ARCHIVE')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => User)
  findByIdUserArchive(@Args('id') id: string) {
    return this.userArchiveService.findById(id);
  }

  @Actions('DELETE_USER_ARCHIVE')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => User)
  async removeUserArchive(
    @Context('user') user: JwtPayloadType,
    @Args('id') id: string,
  ) {
    return await this.userArchiveService.remove(user, id);
  }

  @Actions('ARCHIVE_USER')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => User)
  async archiveUser(
    @Context('user') user: JwtPayloadType,
    @Args('id') id: string,
  ) {
    return await this.archiveUser(user, id);
  }
}
