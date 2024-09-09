import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthGuard } from './guard/auth.guard';
import { ActionModule } from '../action/action.module';
import { RoleModule } from '../role/role.module';
import { ActionGuard } from './guard/action.guard';

@Module({
  imports: [UserModule, ActionModule, RoleModule],
  providers: [AuthResolver, AuthService, AuthGuard, ActionGuard],
})
export class AuthModule {}
