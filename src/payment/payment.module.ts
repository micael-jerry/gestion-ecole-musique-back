import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentService } from './payment.service';
import { PaymentResolver } from './payment.resolver';

@Module({
  providers: [PaymentService, PrismaService, PaymentResolver],
})
export class PaymentModule {}
