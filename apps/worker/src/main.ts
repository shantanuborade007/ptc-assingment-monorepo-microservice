import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';



async function bootstrap() {
  const app = await NestFactory.create(WorkerModule);
  app.useGlobalPipes(new ValidationPipe);
  const configService = app.get((ConfigService))
  const config = new DocumentBuilder()
  .setTitle('Monolithic Architure Api')
  .setDescription('Api Description')
  .setVersion('1.0')
  .build()

  const document = SwaggerModule.createDocument(app,config)
 SwaggerModule.setup('api',app,document);
  await app.listen(configService.get('PORT'));
}
bootstrap();
