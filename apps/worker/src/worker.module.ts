import { Module } from '@nestjs/common';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule, RmqModule ,AuthModule} from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Job,JobSchema } from './schemas/job.schema';
import { JobRepository } from './worker.repository';
import { BLOB_SERVICE } from './constants/services';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal:true,
      validationSchema:Joi.object({
        MONGODB_URI:Joi.string().required(),
        PORT:Joi.number().required()
      }),
      envFilePath:'./apps/worker/.env'
    }),
    DatabaseModule,
    MongooseModule.forFeature([{name:Job.name , schema:JobSchema}]),
    RmqModule.register({
      name: BLOB_SERVICE
    }),
    
  ],
  controllers: [WorkerController],
  providers: [WorkerService,JobRepository],
})
export class WorkerModule {}
