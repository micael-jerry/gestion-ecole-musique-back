import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateFeeTypeInput {
  @IsNotEmpty()
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @IsNumber()
  @Field()
  value: number;
}
