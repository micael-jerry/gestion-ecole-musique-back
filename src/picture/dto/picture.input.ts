import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PictureInput {
  @Field()
  filename: string;

  @Field()
  data: string;
}
