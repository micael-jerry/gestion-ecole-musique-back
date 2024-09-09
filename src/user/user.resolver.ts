import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as Upload from 'graphql-upload/Upload.js';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ActionGuard } from '../auth/guard/action.guard';
import { Actions } from '../auth/decorator/set-metadata-action.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Actions('GET_USER')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => [User])
  findAllUser(
    @Args({
      name: 'roleName',
      nullable: true,
      description:
        'if you want a list of users by role, enter the name of the role, or leave out the parameter',
    })
    roleName: string,
    @Args({
      name: 'criteria',
      nullable: true,
      description:
        'filter user list by firstname OR lastname OR email (case insensitive)',
    })
    criteria: string,
  ) {
    return this.userService.findAll(roleName, criteria);
  }

  @Actions('GET_USER')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => User)
  findByIdUser(@Args('id') id: string) {
    return this.userService.findById(id);
  }

  @Actions('CREATE_USER')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
    @Args({
      name: 'picture',
      type: () => GraphQLUpload,
      nullable: true,
      description:
        'add this header in request: "apollo-require-preflight=true"',
    })
    picture: Upload,
  ) {
    const pictureUploaded = await picture;
    return await this.userService.create(createUserInput, pictureUploaded);
  }

  @Actions('DELETE_USER')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => User)
  async removeUser(@Args('id') id: string) {
    return await this.userService.remove(id);
  }

  @Actions('UPDATE_USER')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Args({
      name: 'picture',
      type: () => GraphQLUpload,
      nullable: true,
      description:
        'add this header in request: "apollo-require-preflight=true"',
    })
    picture: Upload,
  ) {
    const pictureUploaded = await picture;
    return await this.userService.update(updateUserInput, pictureUploaded);
  }
}
