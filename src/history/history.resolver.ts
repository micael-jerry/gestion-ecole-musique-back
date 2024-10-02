import { Args, Query, Resolver } from '@nestjs/graphql';
import { HistoryService } from './history.service';
import { History } from './entities/history.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ActionGuard } from '../auth/guard/action.guard';
import { Actions } from '../auth/decorator/set-metadata-action.decorator';
import { EntityType } from '@prisma/client';

@Resolver()
export class HistoryResolver {
  constructor(private readonly historyService: HistoryService) {}

  @Actions('GET_HISTORY')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => History)
  findHistoryById(@Args('id') id: string) {
    return this.historyService.findById(id);
  }

  @Actions('GET_HISTORY')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => [History])
  findAllHistory(
    @Args('entityType', { type: () => EntityType, nullable: true })
    entityType: EntityType,
    @Args('entityId', { nullable: true }) entityId: string,
  ) {
    return this.historyService.findAll(entityType, entityId);
  }
}
