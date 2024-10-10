import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTimeSlotTimeInput {
  @Field(() => Date)
  start: Date;

  @Field(() => Date)
  end: Date;
}

@InputType()
export class CreateTimeSlotInput {
  @Field()
  teacherId: string;

  @Field(() => [CreateTimeSlotTimeInput])
  times: CreateTimeSlotTimeInput[];
}
