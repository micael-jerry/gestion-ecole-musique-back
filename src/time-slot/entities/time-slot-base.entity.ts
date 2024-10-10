import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { TimeSlotStatus } from '@prisma/client';

registerEnumType(TimeSlotStatus, { name: 'TimeSlotStatus' });

@ObjectType()
export class TimeSlotBase {
  @Field(() => ID)
  id: string;

  @Field(() => TimeSlotStatus)
  status: TimeSlotStatus;

  @Field(() => Date)
  start: Date;

  @Field(() => Date)
  end: Date;
}
