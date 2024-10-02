import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { EntityType, OperationType } from '@prisma/client';
import { User } from '../../user/entities/user.entity';
import GraphQLJSON from 'graphql-type-json';

registerEnumType(EntityType, {
  name: 'EntityType',
});

registerEnumType(OperationType, {
  name: 'OperationType',
});

@ObjectType()
export class History {
  @Field(() => ID)
  id: string;

  @Field()
  entityId: string;

  @Field(() => EntityType)
  entityType: EntityType;

  @Field(() => GraphQLJSON, { nullable: true })
  entity?: JSON;

  @Field(() => OperationType)
  operationType: OperationType;

  @Field(() => User)
  user: User;

  @Field(() => Date)
  createdAt: Date;
}
