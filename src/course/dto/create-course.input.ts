import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateCourseInput {
  @IsNotEmpty()
  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;
}
