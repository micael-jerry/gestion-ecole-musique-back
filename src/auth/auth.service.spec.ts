import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { Test } from '@nestjs/testing';
import { RoleService } from '../role/role.service';
import { LoginInput } from './dto/login.input';
import { UnauthorizedException } from '@nestjs/common';
import { UserOne } from '../../test/conf/test-utils/user.test-utils';

describe('AuthService', () => {
  let userService: UserService;
  let jwtService: JwtService;
  let roleService: RoleService;
  let service: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: UserService, useValue: { findByEmail: jest.fn() } },
        { provide: JwtService, useValue: { sign: jest.fn() } },
        { provide: RoleService, useValue: { getRoleById: jest.fn() } },
        AuthService,
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    roleService = module.get<RoleService>(RoleService);
    service = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should throw an error when the email is not found', async () => {
      // Arrange
      const loginInput: LoginInput = {
        email: 'nonexistent@email.com',
        password: 'testtest123',
      };
      (userService.findByEmail as jest.Mock).mockResolvedValue(null);

      // Act
      try {
        await service.login(loginInput);
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(UnauthorizedException);
        expect(error.message).toBe(`Incorrect email: ${loginInput.email}`);
      }
    });

    it('should throw an error when the password is incorrect', async () => {
      // Arrange
      const loginInput: LoginInput = {
        email: UserOne.email,
        password: 'wrongPassword',
      };
      (userService.findByEmail as jest.Mock).mockResolvedValue(UserOne);
      (roleService.getRoleById as jest.Mock).mockResolvedValue(UserOne.role);

      // Act
      try {
        await service.login(loginInput);
      } catch (error) {
        // Assert
        expect(error).toBeInstanceOf(UnauthorizedException);
        expect(error.message).toBe(`Invalid password`);
      }
    });

    it('should return a valid JWT token when the email and password are correct', async () => {
      // Arrange
      const loginInput: LoginInput = {
        email: UserOne.email,
        password: 'password123',
      };
      (userService.findByEmail as jest.Mock).mockResolvedValue(UserOne);
      (roleService.getRoleById as jest.Mock).mockResolvedValue(UserOne.role);
      (jwtService.sign as jest.Mock).mockReturnValue('validJwtToken');

      // Act
      const result = await service.login(loginInput);

      // Assert
      expect(result.token).toBe('validJwtToken');
    });
  });
});
