import { CreateMusicCategoryInput } from './create-music-category.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMusicCategoryInput extends PartialType(
  CreateMusicCategoryInput,
) {
  @Field()
  id: string;
}
