import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { ActionTypeBase } from './action-base.entity';
import { RoleTypeBase } from '../../role/entities/role-base.entity';

@ObjectType('Action')
export class ActionType extends PickType(ActionTypeBase, [
  'id',
  'name',
  'tag',
  'description',
] as const) {
  @Field(() => [RoleTypeBase], { nullable: true })
  roles?: RoleTypeBase[];
}
