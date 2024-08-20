import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateSettingInput, UpdateSettingInput } from './dto/setting.input';
import { SettingType } from './entities/setting.type';
import { SettingService } from './setting.service';

@Resolver(() => SettingType)
export class SettingResolver {
  constructor(private settingService: SettingService) {}

  @Query(() => [SettingType])
  getAllSetting() {
    return this.settingService.getAllSetting();
  }

  @Query(() => SettingType)
  getSettingById(@Args('id') id: string) {
    return this.settingService.getSettingById(id);
  }

  @Query(() => SettingType)
  deleteSetting(@Args('id') id: string) {
    return this.settingService.deleteSetting(id);
  }

  @Mutation(() => SettingType)
  createSetting(
    @Args('createSettingInput') createSettingInput: CreateSettingInput,
  ) {
    return this.settingService.createSetting(createSettingInput);
  }

  @Mutation(() => SettingType)
  updateSetting(
    @Args('updateSettingInput') updateSettingInput: UpdateSettingInput,
  ) {
    return this.settingService.updateSetting(updateSettingInput);
  }
}
