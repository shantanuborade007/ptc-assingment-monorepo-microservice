import { Controller, Get, Post,Body, UseInterceptors, UploadedFile, Req, UseGuards, Param } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { JobDto } from './dto/jobdto';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '@app/common';


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

  // console.log('here')
  @Post('api/v1/job')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image',multerOptions))
  async createJobWithImage(@UploadedFile() image: Express.Multer.File , status:string,@Req() req:any){
    console.log("inside worker controller....")
    const processedImage = await this.workerService.processImage(image);
    console.log(req.user);
    const createdJob = await this.workerService.createJobMain(processedImage,status,req.user);
    return createdJob;
  }

  @Get('api/v1/job/:id')
  async findJobById(@Param('id') id:string){
      return this.workerService.findByid(id);
  }

  @Get('api/v1/job/:id/status')
  async findJobStatus(@Param('id') id:string){
      return this.workerService.findJobStatus(id);
  }


}
