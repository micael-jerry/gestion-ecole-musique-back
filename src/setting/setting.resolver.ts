import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UpdateSettingInput } from './dto/update-setting.input';
import { SettingType } from './entities/setting.entity';
import { SettingService } from './setting.service';
import { Actions } from '../auth/decorator/set-metadata-action.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ActionGuard } from '../auth/guard/action.guard';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';

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

  @Actions('UPDATE_SETTING')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => SettingType)
  updateSetting(
    @Context('user') user: JwtPayloadType,
    @Args('updateSettingInput') updateSettingInput: UpdateSettingInput,
  ) {
    return this.settingService.updateSetting(updateSettingInput, user);
  }
}
