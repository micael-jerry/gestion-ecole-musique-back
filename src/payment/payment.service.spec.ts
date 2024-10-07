import { Test, TestingModule } from '@nestjs/testing';
import { EntityType, OperationType } from '@prisma/client';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';
import { HistoryService } from '../history/history.service';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentInput } from './dto/payment.input';
import { PaymentService } from './payment.service';
import { PaymentWithIncluded } from './types/payment-with-included.type';

describe('PaymentService', () => {
  let service: PaymentService;
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
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    prismaService = module.get<PrismaService>(PrismaService);
    historyService = module.get<HistoryService>(HistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a payment and log history', async () => {
      const paymentInput: PaymentInput = {
        feeTypeId: 'fee_type_one_id',
        amount: 7000,
        description: 'test',
        date: [new Date()],
        userId: 'user_nine_id',
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
          user: { include: { role: true, courses: true, payments: true } },
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
        feeTypeId: 'fee_type_one_id',
        amount: 7000,
        description: 'test',
        date: [new Date()],
        userId: 'user_nine_id',
        paymentType: 'CASH',
      };
      const authenticatedUser: JwtPayloadType = {
        userId: 'user123',
        roleName: 'testrole',
        actionTags: ['CREATE_PAYMENT'],
      };

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
          feeType: {
            id: 'fee_type_one_id',
            name: 'Ecolage',
            value: 100000,
            description: null,
          },
          amount: 7000,
          description: 'test',
          date: [date],
          paymentType: 'CASH',
          createdAt: new Date(),
          user: {
            id: 'user_nine_id',
            firstname: 'Charlie',
            lastname: 'Brown',
            email: 'charliebrown@example.com',
            phone: '0350000000',
            picture: null,
            address: '345 Pine St',
            courses: [],
            payments: [],
            role: {
              id: 'role_one_id',
              name: 'Student',
            },
            description: null,
            isArchive: null,
            password: null,
            roleId: null,
          },
        },
        {
          id: '30e3b0dc-9294-4f02-8ad0-2a0efefd5db4',
          feeType: {
            id: 'fee_type_one_id',
            name: 'Ecolage',
            value: 100000,
            description: null,
          },
          amount: 7000,
          description: 'test',
          date: [date],
          paymentType: 'CASH',
          createdAt: new Date(),
          user: {
            id: 'user_nine_id',
            firstname: 'Charlie',
            lastname: 'Brown',
            email: 'charliebrown@example.com',
            phone: '0350000000',
            picture: null,
            address: '345 Pine St',
            courses: [],
            payments: [],
            role: {
              id: 'role_one_id',
              name: 'Student',
            },
            description: null,
            isArchive: null,
            password: null,
            roleId: null,
          },
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
          user: { include: { role: true, courses: true, payments: true } },
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
          feeType: {
            id: 'fee_type_one_id',
            name: 'Ecolage',
            value: 100000,
            description: null,
          },
          amount: 7000,
          description: 'test',
          date: [date],
          paymentType: 'CASH',
          createdAt: new Date(),
          user: {
            id: 'user_nine_id',
            firstname: 'Charlie',
            lastname: 'Brown',
            email: 'charliebrown@example.com',
            phone: '0350000000',
            picture: null,
            address: '345 Pine St',
            courses: [],
            payments: [],
            role: {
              id: 'role_one_id',
              name: 'Student',
            },
            description: null,
            isArchive: false,
            password: null,
            roleId: null,
          },
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
          user: { include: { role: true, courses: true, payments: true } },
          feeType: true,
        },
        take: 10,
        skip: 10,
      });
    });
  });
});
