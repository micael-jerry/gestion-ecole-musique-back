import {
  BadRequestException,
  Catch,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements GqlExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError) {
    switch (exception.code) {
      case 'P2025':
        // NotFoundError: Record not found
        throw new NotFoundException(`Resource not found.`);
      case 'P2002':
        // Unique constraint failed
        throw new ConflictException(
          `Unique constraint failed on the field(s).`,
        );
      case 'P2016':
        // Query interpretation error
        throw new BadRequestException(`Query interpretation error`);
      case 'P2003':
        // Foreign key constraint failed
        throw new BadRequestException(
          `Foreign key constraint failed on the field.`,
        );
      default:
        break;
    }
    return exception;
  }
}
