import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { ActionModule } from './action/action.module';
import { MusicCategoryModule } from './music-category/music-category.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { RoleModule } from './role/role.module';
import { SeedService } from './seed/seed.service';
import { SettingModule } from './setting/setting.module';
import { FeeTypeModule } from './fee-type/fee-type.module';
import { UserModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
      serveStaticOptions: {
        extensions: ['jpg', 'jpeg', 'png', 'gif'],
        index: false,
      },
    }),
    PrismaModule,
    MusicCategoryModule,
    SettingModule,
    FeeTypeModule,
    RoleModule,
    ActionModule,
    UserModule,
  ],
  controllers: [],
  providers: [SeedService, PrismaService],
})
export class AppModule {}
