import { Field, InputType, PartialType } from '@nestjs/graphql';
import { BaseUserInput } from './base-user.input';
import { UserRoleInput } from './user.role.input';
import { UpdateUserMusicCategoriesInput } from './user.music-category.input';

@InputType()
export class UpdateUserInput extends PartialType(BaseUserInput) {
  @Field()
  id: string;

  @Field(() => UserRoleInput, { nullable: true })
  role?: UserRoleInput;

  @Field(() => UpdateUserMusicCategoriesInput, { nullable: true })
  musicCategories?: UpdateUserMusicCategoriesInput;
}
