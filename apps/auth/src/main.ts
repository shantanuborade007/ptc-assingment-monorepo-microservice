import { NestFactory } from '@nestjs/core';
import { RmqService } from '@app/common';
import { AuthModule } from './auth.module';
import { RmqOptions } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';




async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(rmqService.getOptions('AUTH', true));
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  await app.startAllMicroservices();

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
