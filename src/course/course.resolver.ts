import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { CourseService } from './course.service';
import { Course } from './entities/course.entity';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Actions } from '../auth/decorator/set-metadata-action.decorator';
import { ActionGuard } from '../auth/guard/action.guard';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';
import { CourseMapper } from './course.mapper';

@Resolver(() => Course)
export class CourseResolver {
  constructor(
    private readonly courseService: CourseService,
    private readonly courseMapper: CourseMapper,
  ) {}

  @Actions('CREATE_COURSE')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => Course)
  async createCourse(
    @Context('user') user: JwtPayloadType,
    @Args('createCourseInput')
    createCourseInput: CreateCourseInput,
  ): Promise<Course> {
    return this.courseMapper.toGraphql(
      await this.courseService.create(createCourseInput, user),
    );
  }

  @Actions('GET_COURSE')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => [Course])
  async findAllCourse(): Promise<Course[]> {
    return (await this.courseService.findAll()).map((c) =>
      this.courseMapper.toGraphql(c),
    );
  }

  @Actions('GET_COURSE')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => Course)
  async findByIdCourse(@Args('id') id: string): Promise<Course> {
    return this.courseMapper.toGraphql(await this.courseService.findById(id));
  }

  @Actions('UPDATE_COURSE')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => Course)
  async updateCourse(
    @Context('user') user: JwtPayloadType,
    @Args('updateCourseInput')
    updateCourseInput: UpdateCourseInput,
  ): Promise<Course> {
    return this.courseMapper.toGraphql(
      await this.courseService.update(updateCourseInput, user),
    );
  }

  @Actions('DELETE_COURSE')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => Course)
  async removeCourse(
    @Context('user') user: JwtPayloadType,
    @Args('id') id: string,
  ): Promise<Course> {
    return this.courseMapper.toGraphql(
      await this.courseService.remove(id, user),
    );
  }
}
