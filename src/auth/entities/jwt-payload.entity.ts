import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JwtPayloadType {
  @Field()
  userId: string;

  @Field()
  roleName: string;

  @Field(() => [String])
  actionTags: string[];
}
