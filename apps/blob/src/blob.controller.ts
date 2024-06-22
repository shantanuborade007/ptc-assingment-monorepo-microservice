import { Controller, Get } from '@nestjs/common';
import { BlobService } from './blob.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common';

@Controller()
export class BlobController {
  constructor(private readonly blobService: BlobService,
              private readonly rmqService:RmqService
  ) {}

  @Get()
  getHello(): string {
    return this.blobService.getHello();
  }



  @EventPattern('job_created2')
  async handleJobCreated2(@Payload() data:any,@Ctx() context:RmqContext){
    // console.log(data)
    const blob = await this.blobService.createBlob2(data)
    this.rmqService.ack(context)
    return blob;
  }
}
