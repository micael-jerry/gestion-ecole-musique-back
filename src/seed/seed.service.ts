import { Injectable } from '@nestjs/common';
import { actionToSeed } from '../../prisma/seed/data/action-seed.data';
import { roleToSeed } from '../../prisma/seed/data/role-seed.data';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SeedService {
  constructor(private prisma: PrismaService) {}

  async seedAction() {
    for (const action of actionToSeed) {
      const existingAction = await this.prisma.action.findUnique({
        where: { tag: action.tag },
      });

      if (!existingAction) {
        await this.prisma.action.create({
          data: action,
        });
        console.log(`${action.name} created`);
      } else {
        console.log(`${action.name} already existed`);
      }
    }

    console.log('Actions seed successfully');
  }

  async seedRole() {
    for (const role of roleToSeed) {
      const existingRole = await this.prisma.role.findUnique({
        where: { name: role.name },
      });

      if (!existingRole) {
        if (role.name === 'Admin') {
          await this.prisma.role.create({
            data: {
              name: role.name,
              actions: {
                create: [
                  {
                    tag: 'ALL',
                    name: 'ALL',
                    description: 'Has all privileges',
                  },
                ],
              },
            },
          });
        } else {
          await this.prisma.role.create({
            data: { name: role.name },
          });
        }
        console.log(`${role.name} created`);
      } else {
        console.log(`${role.name} already existed`);
      }
    }

    console.log('Role seed successfully');
  }
}
