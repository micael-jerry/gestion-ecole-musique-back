import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { ActionModule } from './action/action.module';
import { CourseModule } from './course/course.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { RoleModule } from './role/role.module';
import { SettingModule } from './setting/setting.module';
import { FeeTypeModule } from './fee-type/fee-type.module';
import { UserModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserArchiveModule } from './archive/user-archive.module';
import { HistoryModule } from './history/history.module';
import { PaymentModule } from './payment/payment.module';
import GraphQLJSON from 'graphql-type-json';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      resolvers: { JSON: GraphQLJSON },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'uploads'),
      serveRoot: '/uploads',
      serveStaticOptions: {
        extensions: ['jpg', 'jpeg', 'png', 'gif'],
        index: false,
      },
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '30d' },
    }),
    PrismaModule,
    CourseModule,
    SettingModule,
    FeeTypeModule,
    RoleModule,
    ActionModule,
    UserModule,
    AuthModule,
    UserArchiveModule,
    HistoryModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
