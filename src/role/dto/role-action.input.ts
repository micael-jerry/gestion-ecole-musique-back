import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RoleActionInput {
  @Field()
  id: string;
}

@InputType()
export class UpdateRoleActionInput {
  @Field(() => [RoleActionInput], {
    nullable: true,
    description: 'if you wish to ASSOCIATE a role with one or more actions',
  })
  connect?: RoleActionInput[];

  @Field(() => [RoleActionInput], {
    nullable: true,
    description: 'if you wish to DISASSOCIATE a role with one or more actions',
  })
  disconnect?: RoleActionInput[];
}
