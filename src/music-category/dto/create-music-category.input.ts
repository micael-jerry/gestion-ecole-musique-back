import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateMusicCategoryInput {
  @IsNotEmpty()
  @Field()
  name: string;

  @Field({ nullable: false })
  description: string;
}
