import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class PictureInput {
  @IsNotEmpty()
  @Field()
  filename: string;

  @IsNotEmpty()
  @Field()
  data: string;
}
