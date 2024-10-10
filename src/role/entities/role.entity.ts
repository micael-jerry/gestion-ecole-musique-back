import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { RoleTypeBase } from './role-base.entity';
import { ActionTypeBase } from '../../action/entities/action-base.entity';
import { UserBase } from '../../user/entities/user-base.entity';

@ObjectType('Role')
export class RoleType extends PickType(RoleTypeBase, ['id', 'name']) {
  @Field(() => [ActionTypeBase], { nullable: true })
  actions?: ActionTypeBase[];

  @Field(() => [UserBase], { nullable: true })
  users?: UserBase[];
}
