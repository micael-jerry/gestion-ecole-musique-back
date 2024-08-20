import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MusicCategoryService } from './music-category.service';
import { MusicCategory } from './entities/music-category.entity';
import { CreateMusicCategoryInput } from './dto/create-music-category.input';
import { UpdateMusicCategoryInput } from './dto/update-music-category.input';

@Resolver(() => MusicCategory)
export class MusicCategoryResolver {
  constructor(private readonly musicCategoryService: MusicCategoryService) {}

  @Mutation(() => MusicCategory)
  createMusicCategory(
    @Args('createMusicCategoryInput')
    createMusicCategoryInput: CreateMusicCategoryInput,
  ) {
    return this.musicCategoryService.create(createMusicCategoryInput);
  }

  @Query(() => [MusicCategory])
  findAllMusicCategory() {
    return this.musicCategoryService.findAll();
  }

  @Query(() => MusicCategory)
  findByIdMusicCategory(@Args('id') id: string) {
    return this.musicCategoryService.findById(id);
  }

  @Mutation(() => MusicCategory)
  updateMusicCategory(
    @Args('updateMusicCategoryInput')
    updateMusicCategoryInput: UpdateMusicCategoryInput,
  ) {
    return this.musicCategoryService.update(updateMusicCategoryInput);
  }

  @Mutation(() => MusicCategory)
  removeMusicCategory(@Args('id') id: string) {
    return this.musicCategoryService.remove(id);
  }
}
