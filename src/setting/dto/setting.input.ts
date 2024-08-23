import { Field, InputType, PartialType } from '@nestjs/graphql';
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
export class UpdateSettingInput extends PartialType(CreateSettingInput) {
  @Field()
  id: string;
}
