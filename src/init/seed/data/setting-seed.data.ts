import { Prisma } from '@prisma/client';

export const SeedSetting: Prisma.SettingCreateInput[] = [
  {
    name: 'Délai de grâce',
    tag: 'GRACE_PERIOD',
    value: 0,
    description:
      "Période supplémentaire accordée après la date d'échéance d'un paiement, durant laquelle le débiteur peut régler ce qu'il doit sans encourir de pénalités ou de frais supplémentaires.",
  },
];
