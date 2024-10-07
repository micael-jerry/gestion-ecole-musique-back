import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { EntityType, OperationType } from '@prisma/client';
import { User } from '../../user/entities/user.entity';

registerEnumType(EntityType, {
  name: 'EntityType',
});

registerEnumType(OperationType, {
  name: 'OperationType',
});

@ObjectType()
export class HistoryBase {
  @Field(() => ID)
  id: string;

  @Field()
  entityId: string;

  @Field(() => EntityType)
  entityType: EntityType;

  @Field(() => OperationType)
  operationType: OperationType;

  @Field(() => User)
  user: User;

  @Field(() => Date)
  createdAt: Date;
}
