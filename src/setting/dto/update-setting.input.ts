import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNumber, MinLength } from 'class-validator';

@InputType()
export class BaseUpdateSettingInput {
  @MinLength(3)
  @Field()
  name: string;

  @IsNumber()
  @Field()
  value: number;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class UpdateSettingInput extends PartialType(BaseUpdateSettingInput) {
  @Field()
  id: string;
}
