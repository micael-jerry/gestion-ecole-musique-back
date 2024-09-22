import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CourseService } from './course.service';
import { Course } from './entities/course.entity';
import { CreateCourseInput } from './dto/create-course.input';
import { UpdateCourseInput } from './dto/update-course.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Actions } from '../auth/decorator/set-metadata-action.decorator';
import { ActionGuard } from '../auth/guard/action.guard';

@Resolver(() => Course)
export class CourseResolver {
  constructor(private readonly courseService: CourseService) {}

  @Actions('CREATE_MUSIC_CATEGORY')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => Course)
  createCourse(
    @Args('createCourseInput')
    createCourseInput: CreateCourseInput,
  ) {
    return this.courseService.create(createCourseInput);
  }

  @Actions('GET_MUSIC_CATEGORY')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => [Course])
  findAllCourse() {
    return this.courseService.findAll();
  }

  @Actions('GET_MUSIC_CATEGORY')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => Course)
  findByIdCourse(@Args('id') id: string) {
    return this.courseService.findById(id);
  }

  @Actions('UPDATE_MUSIC_CATEGORY')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => Course)
  updateCourse(
    @Args('updateCourseInput')
    updateCourseInput: UpdateCourseInput,
  ) {
    return this.courseService.update(updateCourseInput);
  }

  @Actions('DELETE_MUSIC_CATEGORY')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => Course)
  removeCourse(@Args('id') id: string) {
    return this.courseService.remove(id);
  }
}
