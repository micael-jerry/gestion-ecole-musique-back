import { Prisma } from '@prisma/client';

export const SeedSetting: Prisma.SettingCreateInput[] = [
  {
    name: 'Délai de grâce',
    tag: 'GRACE_PERIOD',
    value: 0,
    description:
      "Période supplémentaire accordée après la date d'échéance d'un paiement, durant laquelle le débiteur peut régler ce qu'il doit sans encourir de pénalités ou de frais supplémentaires.",
  },
  {
    name: "Delai de validité d'un reservation",
    tag: 'RESERVATION_VALIDITY_PERIOD',
    value: 3,
    description:
      "Nombre de jour durant laquel un reservation reste valide avant d'etre rejeté automatiquement",
  },
];
