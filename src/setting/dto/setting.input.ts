import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, MinLength } from 'class-validator';

@InputType()
export class CreateSettingInput {
  @MinLength(3)
  @Field()
  name: string;

  @IsNumber()
  @Field()
  value: number;
}

@InputType()
export class UpdateSettingInput {
  @Field()
  id: string;

  @MinLength(3)
  @Field({ nullable: true })
  name?: string;

  @IsNumber()
  @Field({ nullable: true })
  value?: number;
}
