import { Test, TestingModule } from '@nestjs/testing';
import { BlobController } from './blob.controller';
import { BlobService } from './blob.service';

describe('BlobController', () => {
  let blobController: BlobController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BlobController],
      providers: [BlobService],
    }).compile();

    blobController = app.get<BlobController>(BlobController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(blobController.getHello()).toBe('Hello World!');
    });
  });
});
