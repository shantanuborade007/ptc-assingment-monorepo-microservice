import { Module } from '@nestjs/common';
import { BlobController } from './blob.controller';
import { BlobService } from './blob.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule, RmqModule } from '@app/common';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import { Blob, BlobSchema } from './schemas/blob.schema';
import { BlobRepository } from './blob.repository';

@Module({
  imports: [
    RmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_BLOB_QUEUE: Joi.string().required()
      }),
      envFilePath: './apps/blob/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([{name:Blob.name , schema:BlobSchema}]),
    ],
  controllers: [BlobController],
  providers: [BlobService,BlobRepository],
})
export class BlobModule {}
