import { Controller, Get, Post,Body, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { JobDto } from './dto/jobdto';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { FileInterceptor } from '@nestjs/platform-express';



const multerOptions: MulterOptions = {
  dest: 'tmp/', // Set the destination for temporary uploaded files
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
};


@Controller()
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Post('demo/job')
  async createJob(@Body() jobDto:JobDto){
    return this.workerService.createJob(jobDto);
  }

  @Post('demo/job2')
  async createJob2(@Body() jobDto:JobDto){
    return this.workerService.createJob2(jobDto);
  }

  //ithe demo/jobs3
  @Post('demo/jobs3')
  async createJob3(@Body() jobDto:JobDto){
    return this.workerService.createJob3(jobDto);
  }
  @Get('getjobs')
  async getJobs(){
    return this.workerService.getJob();
  }

  @Post('api/v1/job')
  @UseInterceptors(FileInterceptor('image',multerOptions))
  async createJobWithImage(@UploadedFile() image: Express.Multer.File , status:string,@Req() req:Request){
    const processedImage = await this.workerService.processImage(image);
    // console.log(processedImage);
    const createdJob = await this.workerService.createJobMain(processedImage,status);
    return createdJob;
  }


}
