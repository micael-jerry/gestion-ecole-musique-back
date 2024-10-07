import { Field, ObjectType, PickType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { HistoryBase } from './history-base.entity';

@ObjectType()
export class History extends PickType(HistoryBase, [
  'id',
  'entityId',
  'entityType',
  'operationType',
  'user',
  'createdAt',
]) {
  @Field(() => GraphQLJSON, { nullable: true })
  entity?: JSON;
}
