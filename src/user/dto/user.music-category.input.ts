import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserMusicCategoryInput {
  @Field()
  id: string;
}

@InputType()
export class UpdateUserMusicCategoriesInput {
  @Field(() => [UserMusicCategoryInput], {
    nullable: true,
    description:
      'if you wish to ASSOCIATE a user with one or more music categories',
  })
  connect?: UserMusicCategoryInput[];
  @Field(() => [UserMusicCategoryInput], {
    nullable: true,
    description:
      'if you wish to DISASSOCIATE a user from one or more music categories',
  })
  disconnect?: UserMusicCategoryInput[];
}
