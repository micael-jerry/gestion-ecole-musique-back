import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FeeTypeService } from './fee-type.service';
import { CreateFeeTypeInput } from './dto/create-fee-type.input';
import { FeeType } from './entities/fee-type.entity';
import { UpdateFeeTypeInput } from './dto/update-fee-type.input';
import { Actions } from '../auth/decorator/set-metadata-action.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ActionGuard } from '../auth/guard/action.guard';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';

@Resolver()
export class FeeTypeResolver {
  constructor(private feeTypeService: FeeTypeService) {}

  @Actions('CREATE_FEE_TYPE')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => FeeType)
  createFeeType(
    @Context('user') user: JwtPayloadType,
    @Args('createFeeTypeInput') createFeeTypeInput: CreateFeeTypeInput,
  ) {
    return this.feeTypeService.create(createFeeTypeInput, user);
  }

  @Actions('GET_FEE_TYPE')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => [FeeType])
  findAllFeeType() {
    return this.feeTypeService.findAll();
  }

  @Actions('GET_FEE_TYPE')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => FeeType)
  findByIdFeeType(@Args('id') id: string) {
    return this.feeTypeService.findById(id);
  }

  @Actions('UPDATE_FEE_TYPE')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => FeeType)
  updateFeeType(
    @Context('user') user: JwtPayloadType,
    @Args('updateFeeTypeInput') updateFeeTypeInput: UpdateFeeTypeInput,
  ) {
    return this.feeTypeService.update(updateFeeTypeInput, user);
  }

  @Actions('DELETE_FEE_TYPE')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => FeeType)
  removeFeeType(@Context('user') user: JwtPayloadType, @Args('id') id: string) {
    return this.feeTypeService.remove(id, user);
  }
}
