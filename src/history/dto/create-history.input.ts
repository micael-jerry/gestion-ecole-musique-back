import { EntityType, OperationType } from '@prisma/client';

export class CreateHistoryInput {
  entityId: string;
  entityType: EntityType;
  operationType: OperationType;
  userId: string;
}
