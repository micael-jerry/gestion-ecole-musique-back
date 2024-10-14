import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Reservation } from './entities/reservation.entity';
import { ReservationService } from './reservation.service';
import { CreateReservationInput } from './dto/create-reservation.input';
import { ReservationStatus } from '@prisma/client';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { Actions } from '../auth/decorator/set-metadata-action.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ActionGuard } from '../auth/guard/action.guard';
import { JwtPayloadType } from '../auth/entities/jwt-payload.entity';

@Resolver(() => Reservation)
export class ReservationResolver {
  constructor(private readonly reservationService: ReservationService) {}

  @Actions('CREATE_RESERVATION')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => Reservation)
  async createReservation(
    @Context('user') user: JwtPayloadType,
    @Args('createReservationInput')
    createReservationInput: CreateReservationInput,
  ): Promise<Reservation> {
    return await this.reservationService.create(createReservationInput, user);
  }

  @Actions('GET_RESERVATION')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => Reservation)
  async findByIdReservation(@Args('id') id: string): Promise<Reservation> {
    return await this.reservationService.findById(id);
  }

  @Actions('GET_RESERVATION')
  @UseGuards(AuthGuard, ActionGuard)
  @Query(() => [Reservation])
  async findAllReservation(
    @Args('studentId', { nullable: true }) studentId: string,
    @Args('status', { type: () => ReservationStatus, nullable: true })
    status: ReservationStatus,
    @Args('timeSLotsTeacherId', { nullable: true })
    timeSlotsTeacherId: string,
  ): Promise<Reservation[]> {
    return await this.reservationService.findAll(
      studentId,
      status,
      timeSlotsTeacherId,
    );
  }

  @Actions('UPDATE_RESERVATION')
  @UseGuards(AuthGuard, ActionGuard)
  @Mutation(() => Reservation)
  async updateReservation(
    @Context('user') user: JwtPayloadType,
    @Args('updateReservationInput')
    updateReservationInput: UpdateReservationInput,
  ): Promise<Reservation> {
    return await this.reservationService.update(updateReservationInput, user);
  }
}
