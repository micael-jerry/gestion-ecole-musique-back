import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class BaseUserInput {
  @IsNotEmpty()
  @MaxLength(100)
  @Field()
  firstname: string;

  @IsNotEmpty()
  @MaxLength(100)
  @Field()
  lastname: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  @Field()
  email: string;

  @MinLength(8)
  @MaxLength(100)
  @Field()
  password: string;

  @IsNotEmpty()
  @Field()
  address: string;

  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(20)
  @Field()
  phone: string;

  @Field({ nullable: true })
  description?: string;
}
