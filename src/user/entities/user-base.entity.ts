import { Field, ID, ObjectType } from '@nestjs/graphql';
import { pathFinderMiddleware } from '../middleware/path-finder.middleware';

@ObjectType()
export class UserBase {
  @Field(() => ID)
  id: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  email: string;

  @Field()
  address: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true, middleware: [pathFinderMiddleware] })
  picture?: string;

  @Field({ nullable: true })
  description?: string;
}
