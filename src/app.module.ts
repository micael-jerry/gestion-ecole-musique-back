import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { PrismaModule } from './prisma/prisma.module';
import { MusicCategoryModule } from './music-category/music-category.module';
import { SettingModule } from './setting/setting.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    PrismaModule,
    MusicCategoryModule,
    SettingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
