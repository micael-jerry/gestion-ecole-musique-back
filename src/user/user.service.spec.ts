import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { RoleAdmin } from '../../test/conf/test-utils/role.test-utils';
import {
  UserAdminOne,
  UserAdminTwo,
} from '../../test/conf/test-utils/user.test-utils';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';
import { HistoryService } from '../history/history.service';
import { PictureInput } from '../picture/dto/picture.input';
import { PictureService } from '../picture/picture.service';
import { PrismaService } from '../prisma/prisma.service';
import { RoleType } from '../role/entities/role.entity';
import { RoleService } from '../role/role.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserWithIncluded } from './types/user-with-included.type';
import { UserService } from './user.service';
import { UserValidator } from './validator/user.validator';

describe('UserService', () => {
  let prisma: PrismaService;
  let roleService: RoleService;
  let pictureService: PictureService;
  let historyService: HistoryService;
  let service: UserService;
  const JWT_PAYLOAD: JwtPayloadType = {
    userId: 'userId',
    roleName: 'roleName',
    actionTags: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaService,
          useValue: {
            $transaction: jest.fn(),
            user: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
        {
          provide: RoleService,
          useValue: {
            getRoleByIdOrName: jest.fn(),
          },
        },
        {
          provide: PictureService,
          useValue: {
            upload: jest.fn(),
            remove: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: HistoryService,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: UserValidator,
          useValue: {
            createUserValidator: jest.fn(),
            updateUserValidator: jest.fn(),
          },
        },
        UserService,
      ],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    roleService = module.get<RoleService>(RoleService);
    pictureService = module.get<PictureService>(PictureService);
    historyService = module.get<HistoryService>(HistoryService);
    service = module.get<UserService>(UserService);
  });

  describe('findAllUser', () => {
    it('should return an empty array when no users are found', async () => {
      // Arrange
      const expectedResult: User[] = [];
      jest.spyOn(prisma.user, 'findMany').mockResolvedValue(expectedResult);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result).toEqual(expectedResult);
    });

    it('should return an array of users with correct roles and music categories', async () => {
      const expectedUsers: User[] = [UserAdminOne, UserAdminTwo];

      jest.spyOn(prisma.user, 'findMany').mockResolvedValueOnce(expectedUsers);

      const result = await service.findAll();

      expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedUsers);
    });
  });

  describe('findByIdUser', () => {
    it('should throw an error when trying to find a user with an invalid ID', async () => {
      const invalidUserId = 'invalid-id';
      jest
        .spyOn(prisma.user, 'findUnique')
        .mockRejectedValue(new Error('User not found'));

      await expect(service.findById(invalidUserId)).rejects.toThrow(
        'User not found',
      );
    });

    it('should return a user with correct roles and music categories when finding a user by ID', async () => {
      const userId = 'test-user-id';
      const expectedUser: User = UserAdminOne;

      jest.spyOn(prisma.user, 'findUnique').mockResolvedValueOnce(expectedUser);

      const result = await service.findById(userId);

      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId, isArchive: false, isDeleted: false },
        include: { role: true, courses: true, payments: true, timeSlots: true },
      });
      expect(result).toEqual(expectedUser);
    });
  });

  describe('findByEmailUser', () => {
    it('should throw an error when trying to find a user by email with an invalid email format', async () => {
      const invalidEmail = 'invalid.email.com';
      jest
        .spyOn(prisma.user, 'findUnique')
        .mockRejectedValue(new Error('User not found'));

      await expect(service.findByEmail(invalidEmail)).rejects.toThrow(
        'User not found',
      );
    });
    it('should return a user with correct roles and music categories when finding a user by email', async () => {
      const email = 'userone@example.com';
      const expectedUser: User = UserAdminOne;

      jest.spyOn(prisma.user, 'findUnique').mockResolvedValueOnce(expectedUser);

      const result = await service.findByEmail(email);

      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: email, isArchive: false, isDeleted: false },
        include: { role: true, courses: true, payments: true, timeSlots: true },
      });
      expect(result).toEqual(expectedUser);
    });
  });

  describe('createUser', () => {
    it('should throw an error when trying to create a user with an invalid role', async () => {
      const invalidRole: RoleType = {
        id: 'invalid-role-id',
        name: 'Invalid Role',
      };
      const createUserInput: CreateUserInput = {
        email: 'test@example.com',
        firstname: 'Test',
        lastname: 'User',
        password: 'test1234567',
        role: invalidRole,
        address: '123 Main St',
        phone: '1234567890',
      };
      const picture: PictureInput = {
        filename: 'test-picture.jpg',
        data: 'data',
      };

      jest
        .spyOn(roleService, 'getRoleByIdOrName')
        .mockRejectedValue(new Error('Role not found'));

      await expect(
        service.create(createUserInput, picture, JWT_PAYLOAD),
      ).rejects.toThrow('Role not found');
    });

    it('should throw an error when trying to create a user with a failed picture upload', async () => {
      const createUserInput: CreateUserInput = {
        email: 'test@example.com',
        firstname: 'Test',
        lastname: 'User',
        password: 'test1234567',
        role: { name: 'ADMIN' },
        address: '123 Main St',
        phone: '1234567890',
      };
      const picture: PictureInput = {
        filename: 'test-picture.jpg',
        data: 'data',
      };

      jest
        .spyOn(roleService, 'getRoleByIdOrName')
        .mockResolvedValueOnce(RoleAdmin);
      jest
        .spyOn(pictureService, 'upload')
        .mockRejectedValueOnce(new Error('Picture upload failed'));

      await expect(
        service.create(createUserInput, picture, JWT_PAYLOAD),
      ).rejects.toThrow('Picture upload failed');
    });

    it('should create a user with valid inputs', async () => {
      const createUserInput = {
        firstname: 'user one firstname',
        lastname: 'user one lastname',
        email: 'userone@example.com',
        address: '123 Main St',
        phone: '0342222222',
        description: 'User One Description',
      };
      const picture: PictureInput = null;

      jest
        .spyOn(roleService, 'getRoleByIdOrName')
        .mockResolvedValueOnce(RoleAdmin);
      jest.spyOn(pictureService, 'upload').mockResolvedValueOnce(null);
      jest.spyOn(prisma.user, 'create').mockResolvedValueOnce(UserAdminOne);
      jest.spyOn(prisma, '$transaction').mockImplementation((callback) => {
        return callback(prisma);
      });

      const result = await service.create(
        {
          role: { name: 'ADMIN' },
          password: 'password123',
          ...createUserInput,
        } satisfies CreateUserInput,
        picture,
        JWT_PAYLOAD,
      );

      expect(prisma.user.create).toHaveBeenCalledTimes(1);
      expect(historyService.create).toHaveBeenCalledTimes(1);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          password: expect.any(String),
          roleId: RoleAdmin.id,
          picture: null,
          courses: { connect: [] },
          ...createUserInput,
        },
        include: { role: true, courses: true, payments: true, timeSlots: true },
      });
      expect(result).toEqual(UserAdminOne);
    });
  });

  describe('removeUser', () => {
    it('should throw an error when trying to remove a user that does not exist', async () => {
      const authenticatedUser: JwtPayloadType = {
        userId: 'user_two_id',
        roleName: 'ADMIN',
        actionTags: [],
      };
      const nonExistentUserId = 'non-existent-user-id';
      jest
        .spyOn(service, 'findById')
        .mockRejectedValue(new Error('User not found'));
      jest.spyOn(prisma, '$transaction').mockImplementation((callback) => {
        return callback(prisma);
      });

      await expect(
        service.remove(authenticatedUser, nonExistentUserId),
      ).rejects.toThrow('User not found');
    });

    it('should return an error if someone tries to delete itself', async () => {
      const authenticatedUser: JwtPayloadType = {
        userId: 'user_two_id',
        roleName: 'ADMIN',
        actionTags: [],
      };
      const userId = 'user_two_id';
      const expectedUser: UserWithIncluded = UserAdminTwo;

      jest.spyOn(service, 'findById').mockResolvedValueOnce(expectedUser);
      jest.spyOn(prisma, '$transaction').mockImplementation((callback) => {
        return callback(prisma);
      });

      await expect(service.remove(authenticatedUser, userId)).rejects.toThrow(
        new BadRequestException('You cannot delete your account yourself'),
      );

      expect(service.findById).toHaveBeenCalledTimes(1);
      expect(service.findById).toHaveBeenCalledWith(userId, false);
      expect(pictureService.remove).not.toHaveBeenCalled();
    });

    it('should remove a user and their associated picture when removing a valid user', async () => {
      const authenticatedUser: JwtPayloadType = {
        userId: 'user_two_id',
        roleName: 'ADMIN',
        actionTags: [],
      };
      const userId = 'user_one_id';
      const expectedUser: UserWithIncluded = UserAdminOne;

      jest.spyOn(service, 'findById').mockResolvedValueOnce(expectedUser);
      jest.spyOn(pictureService, 'remove').getMockImplementation();
      jest.spyOn(prisma, '$transaction').mockImplementation((callback) => {
        return callback(prisma);
      });
      jest.spyOn(prisma.user, 'update').mockResolvedValueOnce(expectedUser);
      jest.spyOn(prisma, '$transaction').mockImplementation((callback) => {
        return callback(prisma);
      });

      const result = await service.remove(authenticatedUser, userId);

      expect(service.findById).toHaveBeenCalledTimes(1);
      expect(service.findById).toHaveBeenCalledWith(userId, false);
      expect(pictureService.remove).toHaveBeenCalledTimes(1);
      expect(pictureService.remove).toHaveBeenCalledWith(expectedUser.picture);
      expect(prisma.user.update).toHaveBeenCalledTimes(1);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: userId, isDeleted: false },
        data: { isDeleted: true },
        include: {
          courses: true,
          payments: true,
          role: true,
          timeSlots: true,
        },
      });
      expect(result).toEqual(expectedUser);
    });
  });

  describe('updateUser', () => {
    it('should throw an error when trying to update a user with a new role that does not exist', async () => {
      const invalidRole: RoleType = {
        id: 'invalid-role-id',
        name: 'Invalid Role',
      };
      const updateUserInput: UpdateUserInput = {
        id: 'test-user-id',
        email: 'test@example.com',
        firstname: 'Test',
        lastname: 'User',
        address: '123 Main St',
        phone: '1234567890',
      };
      const picture: PictureInput = {
        filename: 'test-picture.jpg',
        data: 'data',
      };

      jest.spyOn(service, 'findById').mockResolvedValueOnce(UserAdminOne);
      jest
        .spyOn(roleService, 'getRoleByIdOrName')
        .mockRejectedValue(new Error('Role not found'));
      jest.spyOn(prisma, '$transaction').mockImplementation((callback) => {
        return callback(prisma);
      });

      await expect(
        service.update(
          { role: invalidRole, courses: null, ...updateUserInput },
          picture,
          JWT_PAYLOAD,
        ),
      ).rejects.toThrow('Role not found');
    });

    it('should update a user with a new role and music categories, ensuring the role and music categories are correctly connected', async () => {
      const userId = 'user_one_id';
      const updateUserInput: UpdateUserInput = {
        id: userId,
        email: 'test@example.com',
        firstname: 'Test',
        lastname: 'User',
        address: '123 Main St',
        phone: '1234567890',
      };
      const picture: PictureInput = null;

      jest.spyOn(service, 'findById').mockResolvedValueOnce(UserAdminOne);
      jest
        .spyOn(roleService, 'getRoleByIdOrName')
        .mockResolvedValueOnce(RoleAdmin);
      jest.spyOn(pictureService, 'update').mockResolvedValueOnce(null);
      jest.spyOn(prisma.user, 'update').mockResolvedValueOnce(UserAdminTwo);
      jest.spyOn(prisma, '$transaction').mockImplementation((callback) => {
        return callback(prisma);
      });

      const result = await service.update(
        updateUserInput,
        picture,
        JWT_PAYLOAD,
      );

      expect(prisma.user.update).toHaveBeenCalledTimes(1);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: userId, isDeleted: false },
        data: {
          password: UserAdminOne.password,
          roleId: RoleAdmin.id,
          picture: null,
          courses: {
            connect: [],
            disconnect: [],
          },
          ...updateUserInput,
        },
        include: { role: true, courses: true, payments: true, timeSlots: true },
      });
      expect(result).toEqual(UserAdminTwo);
    });
  });
});
