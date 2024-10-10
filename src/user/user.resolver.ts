import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ActionGuard } from '../auth/guard/action.guard';
import { Actions } from '../auth/decorator/set-metadata-action.decorator';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';
import { PictureInput } from '../picture/dto/picture.input';
import { PaginationInput } from './dto/pagination.input';
import { UserMapper } from './user.mapper';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly userMapper: UserMapper,
  ) {}

  @Actions('GET_ADMIN', 'GET_MANAGER', 'GET_TEACHER', 'GET_STUDENT')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => [User])
  async findAllUser(
    @Args({
      name: 'roleName',
      nullable: true,
      description:
        'if you want a list of users by role, enter the name of the role, or leave out the parameter',
      type: () => [String],
    })
    roleName: string[],
    @Args({
      name: 'courseId',
      nullable: true,
      description:
        'if you want a list of users by course, enter the id of the course, or leave out the parameter',
    })
    courseId: string,
    @Args({
      name: 'criteria',
      nullable: true,
      description:
        'filter user list by firstname OR lastname OR email (case insensitive)',
    })
    criteria: string,
    @Args({
      name: 'pagination',
      nullable: true,
      description: 'min page: 0;\nmin page size: 0',
      type: () => PaginationInput,
    })
    pagination: PaginationInput,
  ): Promise<User[]> {
    return (
      await this.userService.findAll(
        roleName,
        courseId,
        criteria,
        false,
        pagination,
      )
    ).map((u) => this.userMapper.toGraphql(u));
  }

  @Actions('GET_ADMIN', 'GET_MANAGER', 'GET_TEACHER', 'GET_STUDENT')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => User)
  async findByIdUser(@Args('id') id: string): Promise<User> {
    return this.userMapper.toGraphql(await this.userService.findById(id));
  }

  @Actions('GET_ADMIN', 'GET_MANAGER', 'GET_TEACHER', 'GET_STUDENT')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => User)
  async findCurrentUser(@Context('user') user: JwtPayloadType) {
    return this.userMapper.toGraphql(
      await this.userService.findById(user.userId),
    );
  }

  @Actions('CREATE_ADMIN', 'CREATE_MANAGER', 'CREATE_TEACHER', 'CREATE_STUDENT')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => User)
  async createUser(
    @Context('user') user: JwtPayloadType,
    @Args('createUserInput') createUserInput: CreateUserInput,
    @Args({
      name: 'picture',
      type: () => PictureInput,
      nullable: true,
    })
    picture: PictureInput,
  ): Promise<User> {
    return this.userMapper.toGraphql(
      await this.userService.create(createUserInput, picture, user),
    );
  }

  @Actions('DELETE_ADMIN', 'DELETE_MANAGER', 'DELETE_TEACHER', 'DELETE_STUDENT')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => User)
  async removeUser(
    @Context('user') user: JwtPayloadType,
    @Args('id') id: string,
  ): Promise<User> {
    return this.userMapper.toGraphql(await this.userService.remove(user, id));
  }

  @Actions('UPDATE_ADMIN', 'UPDATE_MANAGER', 'UPDATE_TEACHER', 'UPDATE_STUDENT')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => User)
  async updateUser(
    @Context('user') user: JwtPayloadType,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Args({
      name: 'picture',
      type: () => PictureInput,
      nullable: true,
    })
    picture: PictureInput,
  ): Promise<User> {
    return this.userMapper.toGraphql(
      await this.userService.update(updateUserInput, picture, user),
    );
  }
}
