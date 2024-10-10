import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentService } from './payment.service';
import { PaymentResolver } from './payment.resolver';
import { FeeTypeService } from '../fee-type/fee-type.service';
import { UserModule } from '../user/user.module';
import { PaymentMapper } from './payment.mapper';
import { UserMapper } from '../user/user.mapper';

@Module({
  imports: [UserModule],
  providers: [
    PaymentResolver,
    PaymentService,
    PrismaService,
    FeeTypeService,
    PaymentMapper,
    UserMapper,
  ],
})
export class PaymentModule {}
