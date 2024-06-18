import { Controller, Get } from '@nestjs/common';
import { BlobService } from './blob.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class BlobController {
  constructor(private readonly blobService: BlobService) {}

  @Get()
  getHello(): string {
    return this.blobService.getHello();
  }

  @EventPattern('job_created')
  async handleJobCreated(@Payload() data:any,@Ctx() context:RmqContext){
    this.blobService.createBlob(data)
  }

  @EventPattern('job_created2')
  async handleJobCreated2(@Payload() data:any,@Ctx() context:RmqContext){
    // console.log(data)
    const blob = await this.blobService.createBlob2(data)
    return blob;
  }
}
