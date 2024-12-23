import { Test, TestingModule } from '@nestjs/testing';
import { EntityType, OperationType, PaymentType } from '@prisma/client';
import { FeeTypeOne } from '../../test/conf/test-utils/fee-type.test-utils';
import { UserStudentNine } from '../../test/conf/test-utils/user.test-utils';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';
import { FeeTypeService } from '../fee-type/fee-type.service';
import { HistoryService } from '../history/history.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { PaymentInput } from './dto/payment.input';
import { PaymentService } from './payment.service';
import { PaymentWithIncluded } from './types/payment-with-included.type';

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
    it('should retrieve a list of payments', async () => {
      const payments = [
        {
          feeTypeId: 'feeTypeId',
          amount: 100,
          description: 'description',
          date: [new Date()],
          paymentType: PaymentType.CASH,
          userId: 'userId',
          id: 'id',
          createdAt: new Date(),
        },
      ];
      const total_count = 1;

      jest.spyOn(prismaService.payment, 'findMany').mockResolvedValue(payments);
      jest.spyOn(service, 'countPayments').mockResolvedValue(total_count);

      const result = await service.getPayments();

      expect(result).toEqual({ payments, total_count });
      expect(prismaService.payment.findMany).toHaveBeenCalled();
      expect(service.countPayments).toHaveBeenCalled();
    });
  });
});
