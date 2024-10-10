import { Test, TestingModule } from '@nestjs/testing';
import { EntityType, OperationType } from '@prisma/client';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';
import { HistoryService } from '../history/history.service';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentInput } from './dto/payment.input';
import { PaymentService } from './payment.service';
import { PaymentWithIncluded } from './types/payment-with-included.type';
import { FeeTypeOne } from '../../test/conf/test-utils/fee-type.test-utils';
import {
  UserStudentNine,
  UserStudentOne,
  UserStudentTwo,
} from '../../test/conf/test-utils/user.test-utils';
import { FeeTypeService } from '../fee-type/fee-type.service';
import { UserService } from '../user/user.service';

describe('PaymentService', () => {
  let service: PaymentService;
  let feeTypeService: FeeTypeService;
  let userService: UserService;
  let prismaService: PrismaService;
  let historyService: HistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: PrismaService,
          useValue: {
            $transaction: jest.fn(),
            payment: {
              create: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
        {
          provide: HistoryService,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: FeeTypeService,
          useValue: {
            findById: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    prismaService = module.get<PrismaService>(PrismaService);
    historyService = module.get<HistoryService>(HistoryService);
    feeTypeService = module.get<FeeTypeService>(FeeTypeService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a payment and log history', async () => {
      const paymentInput: PaymentInput = {
        feeTypeId: FeeTypeOne.id,
        amount: 7000,
        description: 'test',
        date: [new Date()],
        userId: UserStudentNine.id,
        paymentType: 'CASH',
      };
      const authenticatedUser: JwtPayloadType = {
        userId: 'user123',
        roleName: 'testrole',
        actionTags: ['CREATE_PAYMENT'],
      };
      const createdPayment: PaymentWithIncluded = {
        id: 'payment-id',
        amount: 7000,
        description: 'test',
        date: [new Date()],
        paymentType: 'CASH',
        createdAt: new Date(),
        feeType: null,
        user: null,
      };

      jest.spyOn(feeTypeService, 'findById').mockResolvedValue(FeeTypeOne);
      jest.spyOn(userService, 'findById').mockResolvedValue(UserStudentNine);
      jest
        .spyOn(prismaService, '$transaction')
        .mockImplementation((callback) => {
          return callback(prismaService);
        });
      jest
        .spyOn(prismaService.payment, 'create')
        .mockResolvedValue(createdPayment as any);
      jest.spyOn(historyService, 'create').mockResolvedValue(undefined);

      const result = await service.create(paymentInput, authenticatedUser);

      expect(result).toEqual(createdPayment);
      expect(prismaService.payment.create).toHaveBeenCalledWith({
        data: paymentInput,
        include: {
          user: {
            include: {
              role: true,
              courses: true,
              payments: true,
              timeSlots: true,
            },
          },
          feeType: true,
        },
      });
      expect(historyService.create).toHaveBeenCalledWith(
        {
          entityId: createdPayment.id,
          entityType: EntityType.PAYMENT,
          operationType: OperationType.CREATE,
          userId: authenticatedUser.userId,
        },
        prismaService,
      );
    });

    it('should throw an error if payment creation fails', async () => {
      const paymentInput: PaymentInput = {
        feeTypeId: FeeTypeOne.id,
        amount: 7000,
        description: 'test',
        date: [new Date()],
        userId: UserStudentNine.id,
        paymentType: 'CASH',
      };
      const authenticatedUser: JwtPayloadType = {
        userId: 'user123',
        roleName: 'testrole',
        actionTags: ['CREATE_PAYMENT'],
      };

      jest.spyOn(feeTypeService, 'findById').mockResolvedValue(FeeTypeOne);
      jest.spyOn(userService, 'findById').mockResolvedValue(UserStudentNine);
      jest
        .spyOn(prismaService, '$transaction')
        .mockImplementation((callback) => {
          return callback(prismaService);
        });
      jest
        .spyOn(prismaService.payment, 'create')
        .mockRejectedValue(
          new Error('Payment creation failed: Creation error'),
        );

      await expect(
        service.create(paymentInput, authenticatedUser),
      ).rejects.toThrow('Payment creation failed: Creation error');
    });
  });

  describe('getPayments', () => {
    it('should return an array of payments', async () => {
      const date = new Date();
      const payments: PaymentWithIncluded[] = [
        {
          id: '30e3b0dc-9294-4f02-8ad0-2a0efefd5db4',
          feeType: FeeTypeOne,
          amount: 7000,
          description: 'test',
          date: [date],
          paymentType: 'CASH',
          createdAt: new Date(),
          user: UserStudentOne,
        },
        {
          id: '30e3b0dc-9294-4f02-8ad0-2a0efefd5db4',
          feeType: FeeTypeOne,
          amount: 7000,
          description: 'test',
          date: [date],
          paymentType: 'CASH',
          createdAt: new Date(),
          user: UserStudentTwo,
        },
      ];

      jest
        .spyOn(prismaService.payment, 'findMany')
        .mockResolvedValue(payments as any);

      const result = await service.getPayments();

      expect(result).toEqual(payments);
      expect(prismaService.payment.findMany).toHaveBeenCalledWith({
        where: {},
        include: {
          user: {
            include: {
              role: true,
              courses: true,
              payments: true,
              timeSlots: true,
            },
          },
          feeType: true,
        },
        take: 25,
        skip: 0,
      });
    });

    it('should apply filters and pagination', async () => {
      const date = new Date();
      const payments: PaymentWithIncluded[] = [
        {
          id: '30e3b0dc-9294-4f02-8ad0-2a0efefd5db4',
          feeType: FeeTypeOne,
          amount: 7000,
          description: 'test',
          date: [date],
          paymentType: 'CASH',
          createdAt: new Date(),
          user: UserStudentOne,
        },
      ];

      jest
        .spyOn(prismaService.payment, 'findMany')
        .mockResolvedValue(payments as any);

      const keyword = 'Charlie';
      const startDate = new Date('2023-01-01');
      const endDate = new Date('2023-12-31');
      const page = 2;
      const limit = 10;

      const result = await service.getPayments(
        keyword,
        startDate,
        endDate,
        page,
        limit,
      );

      expect(result).toEqual(payments);
      expect(prismaService.payment.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            {
              OR: [
                {
                  user: {
                    firstname: {
                      contains: 'Charlie',
                      mode: 'insensitive',
                    },
                  },
                },
                {
                  user: {
                    lastname: {
                      contains: 'Charlie',
                      mode: 'insensitive',
                    },
                  },
                },
                {
                  feeType: {
                    name: {
                      contains: 'Charlie',
                      mode: 'insensitive',
                    },
                  },
                },
              ],
            },
          ],
          AND: [
            {
              createdAt: {
                gte: startDate,
                lte: endDate,
              },
            },
          ],
        },
        include: {
          user: {
            include: {
              role: true,
              courses: true,
              payments: true,
              timeSlots: true,
            },
          },
          feeType: true,
        },
        take: 10,
        skip: 10,
      });
    });
  });
});
