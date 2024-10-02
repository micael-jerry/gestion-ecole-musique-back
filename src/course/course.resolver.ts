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

@Resolver(() => Course)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Actions('CREATE_COURSE')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => Course)
  createCourse(
    @Context('user') user: JwtPayloadType,
    @Args('createCourseInput')
    createCourseInput: CreateCourseInput,
  ) {
    return this.courseService.create(createCourseInput, user);
  }

  @Actions('GET_COURSE')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => [Course])
  findAllCourse() {
    return this.courseService.findAll();
  }

  @Actions('GET_COURSE')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => Course)
  findByIdCourse(@Args('id') id: string) {
    return this.courseService.findById(id);
  }

  @Actions('UPDATE_COURSE')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => Course)
  updateCourse(
    @Context('user') user: JwtPayloadType,
    @Args('updateCourseInput')
    updateCourseInput: UpdateCourseInput,
  ) {
    return this.courseService.update(updateCourseInput, user);
  }

  @Actions('DELETE_COURSE')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => Course)
  removeCourse(@Context('user') user: JwtPayloadType, @Args('id') id: string) {
    return this.courseService.remove(id, user);
  }
}
