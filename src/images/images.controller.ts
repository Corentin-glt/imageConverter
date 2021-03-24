import {
  Body,
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

import { ImagesService } from './images.service';

class ConvertirBodyDto {
  file: Express.Multer.File;
  referential?: string;
}

@Controller('images')
export class ImagesController {
  constructor(private imageService: ImagesService) {}

  @Post('convertir')
  @UseInterceptors(FileInterceptor('file'))
  convertir(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: ConvertirBodyDto,
  ) {
    return this.imageService.convertir({ file, referential: data.referential });
  }
}
