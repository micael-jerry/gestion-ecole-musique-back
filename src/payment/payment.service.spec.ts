import { Test, TestingModule } from '@nestjs/testing';
import {
  EntityType,
  OperationType,
  Payment,
  PaymentType,
} from '@prisma/client';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';
import { HistoryService } from '../history/history.service';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentInput } from './dto/payment.input';
import { PaymentService } from './payment.service';

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
        feeTypeId: 'feeType123',
        amount: 100,
        description: 'Test payment',
        date: [new Date()],
        paymentType: PaymentType.CASH,
        userId: 'user123',
      };
      const authenticatedUser: JwtPayloadType = {
        userId: 'user123',
        roleName: 'testrole',
        actionTags: ['CREATE_PAYMENT'],
      };
      const payment = { id: 'payment123', ...paymentInput };

      jest
        .spyOn(prismaService.payment, 'create')
        .mockResolvedValue(payment as Payment);
      jest.spyOn(historyService, 'create').mockResolvedValue(undefined);

      const result = await service.create(paymentInput, authenticatedUser);

      expect(prismaService.payment.create).toHaveBeenCalledWith({
        data: paymentInput,
      });
      expect(historyService.create).toHaveBeenCalledWith({
        entityId: payment.id,
        entityType: EntityType.PAYMENT,
        operationType: OperationType.CREATE,
        userId: authenticatedUser.userId,
      });
      expect(result).toEqual(payment);
    });
  });

  describe('getPayments', () => {
    it('should return an array of payments', async () => {
      const payments = [
        {
          id: 'payment1',
          feeTypeId: 'feeType1',
          amount: 100,
          description: 'Payment 1',
          date: [new Date()],
          paymentType: PaymentType.CARD,
          userId: 'user1',
        },
        {
          id: 'payment2',
          feeTypeId: 'feeType2',
          amount: 200,
          description: 'Payment 2',
          date: [new Date()],
          paymentType: PaymentType.CASH,
          userId: 'user2',
        },
      ];

      jest.spyOn(prismaService.payment, 'findMany').mockResolvedValue(payments);

      const result = await service.getPayments();

      expect(prismaService.payment.findMany).toHaveBeenCalled();
      expect(result).toEqual(payments);
    });
  });
});
