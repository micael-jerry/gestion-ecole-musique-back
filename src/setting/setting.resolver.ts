import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateSettingInput, UpdateSettingInput } from './dto/setting.input';
import { SettingType } from './entities/setting.entity';
import { SettingService } from './setting.service';
import { Actions } from '../auth/decorator/set-metadata-action.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ActionGuard } from '../auth/guard/action.guard';

@Resolver(() => SettingType)
export class SettingResolver {
  constructor(private settingService: SettingService) {}

  @Actions('GET_SETTING')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => [SettingType])
  getAllSetting() {
    return this.settingService.getAllSetting();
  }

  @Actions('GET_SETTING')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => SettingType)
  getSettingById(@Args('id') id: string) {
    return this.settingService.getSettingById(id);
  }

  @Actions('DELETE_SETTING')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => SettingType)
  deleteSetting(@Args('id') id: string) {
    return this.settingService.deleteSetting(id);
  }

  @Actions('CREATE_SETTING')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => SettingType)
  createSetting(
    @Args('createSettingInput') createSettingInput: CreateSettingInput,
  ) {
    return this.settingService.createSetting(createSettingInput);
  }

  @Actions('UPDATE_SETTING')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => SettingType)
  updateSetting(
    @Args('updateSettingInput') updateSettingInput: UpdateSettingInput,
  ) {
    return this.settingService.updateSetting(updateSettingInput);
  }
}
