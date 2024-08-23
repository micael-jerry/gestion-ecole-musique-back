import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateFeeTypeInput {
  @IsNotEmpty()
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;
}
