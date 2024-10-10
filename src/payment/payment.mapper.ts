import { Injectable } from '@nestjs/common';
import { PaymentWithIncluded } from './types/payment-with-included.type';
import { Payment } from './entities/payment.entity';
import { UserMapper } from '../user/user.mapper';

@Injectable()
export class PaymentMapper {
  constructor(private readonly userMapper: UserMapper) {}

  toGraphql(entity: PaymentWithIncluded): Payment {
    return { user: this.userMapper.toGraphql(entity.user), ...entity };
  }
}
