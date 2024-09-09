import { Field, InputType } from '@nestjs/graphql';
import { IsUppercase, MinLength } from 'class-validator';

@InputType()
export class CreateRoleInput {
  @MinLength(4)
  @IsUppercase({ message: 'The value must be in capital case' })
  @Field()
  name: string;
}
