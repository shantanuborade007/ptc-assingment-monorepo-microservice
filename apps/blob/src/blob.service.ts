import { Injectable, Logger } from '@nestjs/common';
import { BlobRepository } from './blob.repository';
import { BlobDto } from './dto/blob.dt';

@Injectable()
export class BlobService {

  constructor(
    private readonly blobRepository:BlobRepository
  ){}

  private readonly logger = new Logger(BlobService.name)

  getHello(): string {
    return 'Hello World!';
  }

  async createBlob2(data:any){
    //  console.log(data)
    //  const { content, md5 } = processedImage;
     const md5 = data.processedImage.md5
     const content = data.processedImage.content;
     console.log(md5)
    console.log('inside blob controller .... ')
    const blob = await this.blobRepository.create({
      md5:md5,
      content:content,
      encoding:'base64',
    })
    
    // console.log(blob);
    return blob;
  }
}
