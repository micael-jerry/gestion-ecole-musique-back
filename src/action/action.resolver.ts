import { Args, Query, Resolver } from '@nestjs/graphql';
import { ActionService } from './action.service';
import { ActionType } from './entities/action.entity';

@Resolver(() => ActionType)
export class ActionResolver {
  constructor(private actionService: ActionService) {}
  @Query(() => [ActionType])
  getAllActions() {
    return this.actionService.getAllActions();
  }

  @Query(() => ActionType)
  getActionById(@Args('id') id: string) {
    return this.actionService.getActionById(id);
  }
}
