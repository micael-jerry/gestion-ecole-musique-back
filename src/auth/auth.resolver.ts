import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { LoginInput } from './dto/login.input';
import { AuthResponse } from './entities/auth-response.entity';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './guard/auth.guard';
import { JwtPayloadType } from './entities/jwt-payload.entity';

@Resolver(() => AuthResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => AuthResponse)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @UseGuards(AuthGuard)
  @Query(() => JwtPayloadType, {
    description: 'Identify a user authenticate',
  })
  whoami(@Context('user') user: JwtPayloadType) {
    return user;
  }
}
