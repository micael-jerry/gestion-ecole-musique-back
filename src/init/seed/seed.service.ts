import { Injectable } from '@nestjs/common';
import { Action } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { SeedAction } from './data/action-seed.data';
import { SeedRole } from './data/role-seed.data';
import { DefaultUser } from './data/user-seed.data';

@Injectable()
export class SeedService {
  constructor(private prisma: PrismaService) {}

  async seederAction() {
    for (const action of SeedAction) {
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

  async seederRole() {
    for (const role of SeedRole) {
      const existingRole = await this.prisma.role.findUnique({
        where: { name: role.name },
      });

      if (!existingRole) {
        if (role.name === 'ADMIN') {
          const action: Action[] = await this.prisma.action.findMany();
          await this.prisma.role.create({
            data: {
              name: role.name,
              actions: {
                connect: [...action],
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

  async seederDefaultUser() {
    const role = await this.prisma.role.findUnique({
      where: { name: 'ADMIN' },
    });
    await this.prisma.user
      .create({ data: DefaultUser(role.id) })
      .then(() => console.log('Default user created'));
  }
}
