import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class ActionTypeInput {
  @Field()
  id: string;

  @MinLength(4)
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;
}
