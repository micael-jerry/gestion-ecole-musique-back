import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Setting')
export class SettingType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  value: number;

  @Field({ nullable: true })
  description?: string;

  @Field()
  tag: string;
}
