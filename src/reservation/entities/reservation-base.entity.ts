import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ReservationStatus } from '@prisma/client';

registerEnumType(ReservationStatus, { name: 'ReservationStatus' });

@ObjectType()
export class ReservationBase {
  @Field()
  id: string;

  @Field(() => ReservationStatus)
  status: ReservationStatus;
}
