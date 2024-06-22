import { Inject, Injectable } from '@nestjs/common';
import { JobDto } from './dto/jobdto';
import { Job } from './schemas/job.schema';
import { JobRepository } from './worker.repository';
import { BLOB_SERVICE } from './constants/services';
import {ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as crypto from 'crypto';
const {ObjectId} = require('mongodb');


@Injectable()
export class WorkerService {

  constructor(private readonly jobRepository:JobRepository,
              @Inject(BLOB_SERVICE) private blobClient:ClientProxy,
  ){}

 async processImage(file: Express.Multer.File): Promise<{ content: string; md5: string }> {
  if (!file) {
    throw new NotFoundException('No image file uploaded');
  }

  const buffer = await fs.promises.readFile(file.path);

  const content = buffer.toString('base64');
  const md5 = crypto.createHash('md5').update(buffer).digest('hex');

  await fs.promises.unlink(file.path); // Clean up temporary file
  // console.log(content,md5)
  return { content, md5 };
} 

  async createJobMain(processedImage:any,status:string,user:any){
    const session = await this.jobRepository.startTransaction();
    const userId= user._id;
      const tenetId =user.tenetId;
      const clientId = user.clientId;

      try{
        const data = await lastValueFrom(
          await this.blobClient.send('job_created2',{
            processedImage
          })
        );

        
        const imgURL = data._id
        const job = this.jobRepository.create({
          imgURL,
          status,
          userId,
          tenetId,
          clientId
        },{session})

      await session.commitTransaction()
      

      return job
        
      }catch(err){
        await session.abortTransaction()
        throw err;
      }
  }

  async findByid(id:string):Promise<Job>{
    const newId = new ObjectId(id)
    return await this.jobRepository.findOne(newId);
}

async findJobStatus(id:string):Promise<any>{
    const newId = new ObjectId(id)
    const job = await this.jobRepository.findOne(newId);
    return job.status
} 

}
