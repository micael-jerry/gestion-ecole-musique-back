import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MusicCategoryService } from './music-category.service';
import { MusicCategory } from './entities/music-category.entity';
import { CreateMusicCategoryInput } from './dto/create-music-category.input';
import { UpdateMusicCategoryInput } from './dto/update-music-category.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Actions } from '../auth/decorator/set-metadata-action.decorator';
import { ActionGuard } from '../auth/guard/action.guard';

@Resolver(() => MusicCategory)
export class MusicCategoryResolver {
  constructor(private readonly musicCategoryService: MusicCategoryService) {}

  @Actions('CREATE_MUSIC')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => MusicCategory)
  createMusicCategory(
    @Args('createMusicCategoryInput')
    createMusicCategoryInput: CreateMusicCategoryInput,
  ) {
    return this.musicCategoryService.create(createMusicCategoryInput);
  }

  @Actions('GET_MUSIC')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => [MusicCategory])
  findAllMusicCategory() {
    return this.musicCategoryService.findAll();
  }

  @Actions('GET_MUSIC')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => MusicCategory)
  findByIdMusicCategory(@Args('id') id: string) {
    return this.musicCategoryService.findById(id);
  }

  @Actions('UPDATE_MUSIC')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => MusicCategory)
  updateMusicCategory(
    @Args('updateMusicCategoryInput')
    updateMusicCategoryInput: UpdateMusicCategoryInput,
  ) {
    return this.musicCategoryService.update(updateMusicCategoryInput);
  }

  @Actions('DELETE_MUSIC')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => MusicCategory)
  removeMusicCategory(@Args('id') id: string) {
    return this.musicCategoryService.remove(id);
  }
}
