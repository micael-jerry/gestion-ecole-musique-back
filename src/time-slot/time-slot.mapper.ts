import { Injectable } from '@nestjs/common';
import { TimeSlotWithIncluded } from './types/time-slot-with-included.type';
import { TimeSlot } from './entities/time-slot.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class TimeSlotMapper {
  toGraphql(entity: TimeSlotWithIncluded): TimeSlot {
    let student: User;
    if (entity.status === 'TAKEN') {
      for (const reservation of entity.reservations) {
        if (reservation.status === 'APPROVED') {
          student = reservation.student;
          break;
        }
      }
    }
    return { ...entity, student };
  }
}
