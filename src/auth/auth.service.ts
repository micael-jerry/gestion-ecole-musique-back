import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthResponse } from './entities/auth-response.entity';
import { LoginInput } from './dto/login.input';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtPayloadType } from './entities/jwt-payload.entity';
import { UserWithIncluded } from '../user/types/user-with-included.type';
import { RoleService } from '../role/role.service';
import { RoleWithIncluded } from '../role/types/role-with-included.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly roleService: RoleService,
  ) {}

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const user: UserWithIncluded = await this.userService.findByEmail(
      loginInput.email,
    );

    if (user) {
      const comparePassword = await bcrypt.compare(
        loginInput.password,
        user.password,
      );
      if (comparePassword) return this.generateToken(user);
      else throw new UnauthorizedException(`Invalid password`);
    } else
      throw new UnauthorizedException(`Incorrect email: ${loginInput.email}`);
  }

  private async generateToken(user: UserWithIncluded): Promise<AuthResponse> {
    const role: RoleWithIncluded = await this.roleService.getRoleById(
      user.role.id,
    );
    const payload: JwtPayloadType = {
      userId: user.id,
      roleName: user.role.name,
      actionTags: role.actions.map((action) => action.tag),
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
