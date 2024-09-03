import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './conf/prisma-exception.filter';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const port = process.env.PORT_SERVER || 8080;
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  app.use(graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 1 }));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new PrismaExceptionFilter());
  await app.listen(port);
  console.log(`server started on ${await app.getUrl()}`);
}

bootstrap();
