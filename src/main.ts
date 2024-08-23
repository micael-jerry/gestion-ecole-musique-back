import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './conf/prisma-exception.filter';

async function bootstrap() {
  const port = process.env.PORT_SERVER || 8080;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new PrismaExceptionFilter());
  await app.listen(port);
  console.log(`server started on ${await app.getUrl()}`);
}
bootstrap();
