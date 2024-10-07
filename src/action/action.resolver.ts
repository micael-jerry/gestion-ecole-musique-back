import { Args, Query, Resolver } from '@nestjs/graphql';
import { ActionService } from './action.service';
import { ActionType } from './entities/action.entity';

@Resolver(() => ActionType)
export class ActionResolver {
  constructor(private readonly actionService: ActionService) {}
  @Query(() => [ActionType])
  async getAllActions(): Promise<ActionType[]> {
    return this.actionService.getAllActions();
  }

  @Query(() => ActionType)
  async getActionById(@Args('id') id: string): Promise<ActionType> {
    return this.actionService.getActionById(id);
  }
}
