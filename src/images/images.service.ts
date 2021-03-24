import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

class ConvertirParams {
  file: Express.Multer.File;
  referential?: string;
}

@Injectable()
export class ImagesService {
  constructor(@InjectQueue('images') private imageQueue: Queue) {}

  convertir(params: ConvertirParams) {
    this.imageQueue.add('convertir', params);
    return true;
  }
}
