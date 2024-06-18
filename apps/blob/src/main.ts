import { NestFactory } from '@nestjs/core';
import { BlobModule } from './blob.module';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(BlobModule);
  const rmqService = app.get<RmqService>(RmqService)
  app.connectMicroservice(rmqService.getOptions('BLOB'));
  await app.startAllMicroservices()
}
bootstrap();
