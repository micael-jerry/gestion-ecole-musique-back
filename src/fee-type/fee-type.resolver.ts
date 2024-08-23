import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FeeTypeService } from './fee-type.service';
import { CreateFeeTypeInput } from './dto/create-fee-type.input';
import { FeeType } from './entities/fee-type.entity';
import { UpdateFeeTypeInput } from './dto/update-fee-type.input';

@Resolver()
export class FeeTypeResolver {
  constructor(private feeTypeService: FeeTypeService) {}

  @Mutation(() => FeeType)
  createFeeType(
    @Args('createFeeTypeInput') createFeeTypeInput: CreateFeeTypeInput,
  ) {
    return this.feeTypeService.create(createFeeTypeInput);
  }

  @Query(() => [FeeType])
  findAllFeeType() {
    return this.feeTypeService.findAll();
  }

  @Query(() => FeeType)
  findByIdFeeType(@Args('id') id: string) {
    return this.feeTypeService.findById(id);
  }

  @Mutation(() => FeeType)
  updateFeeType(
    @Args('updateFeeTypeInput') updateFeeTypeInput: UpdateFeeTypeInput,
  ) {
    return this.feeTypeService.update(updateFeeTypeInput);
  }

  @Mutation(() => FeeType)
  removeFeeType(@Args('id') id: string) {
    return this.feeTypeService.remove(id);
  }
}
