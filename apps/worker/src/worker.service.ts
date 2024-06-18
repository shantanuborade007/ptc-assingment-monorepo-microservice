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

@Injectable()
export class WorkerService {

  constructor(private readonly jobRepository:JobRepository,
              @Inject(BLOB_SERVICE) private blobClient:ClientProxy
  ){}

  async createJob(jobData:JobDto){
    const {imgURL,status} = jobData

    /*following info is for demo only , yaha 
      user ke jwt se data fetch hoga !!!
    */
     const userId= "demoId"
     const tenetId ="demoId"
     const clientId = "demoID"
     const job =  this.jobRepository.create({
      imgURL,
      status,
      userId,
      tenetId,
      clientId
    })

    return job
  }

  async getJob(){
    return this.jobRepository.find({})
  }


 async createJob2(jobData:JobDto){
    const session = await this.jobRepository.startTransaction();
     /*following info is for demo only , yaha 
      user ke jwt se data fetch hoga !!!
    */
      const userId= "demoId"
      const tenetId ="demoId"
      const clientId = "demoID"
    try{
      const {imgURL,status} = jobData
      const job = await this.jobRepository.create({
        imgURL,
        status,
        userId,
        tenetId,
        clientId
      },{session});

      await lastValueFrom(
        this.blobClient.emit('job_created',{
          jobData
        })
      );

      await session.commitTransaction()
      return job

    }catch(err){
      await session.abortTransaction()
      throw err;
    }
 }


 async createJob3(jobData:JobDto){
  const session = await this.jobRepository.startTransaction();
     /*following info is for demo only , yaha 
      user ke jwt se data fetch hoga !!!
    */
      const userId= "demoId"
      const tenetId ="demoId"
      const clientId = "demoID"
    try{
      const {imgURL,status} = jobData
      const job = await this.jobRepository.create({
        imgURL,
        status,
        userId,
        tenetId,
        clientId
      },{session});

      const md5='this is demomd5'
      const content='this is demo content'
      const jobData1 ={md5,content}
      console.log(jobData1)
      await lastValueFrom(
        this.blobClient.emit('job_created2',{
          jobData1
        })
      );

      await session.commitTransaction()
      return job

    }catch(err){
      await session.abortTransaction()
      throw err;
    }
 }

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

  async createJobMain(processedImage:any,status:string){
    const session = await this.jobRepository.startTransaction();
    const userId= "demoId"
      const tenetId ="demoId"
      const clientId = "demoID"

      try{
        const data = await lastValueFrom(
          await this.blobClient.emit('job_created2',{
            processedImage
          })
        );
        const imgURL = 'demourl'
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

}
