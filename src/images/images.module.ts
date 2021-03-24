import { BullModule } from '@nestjs/bull';
import { HttpModule, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { ImagesController } from './images.controller';
import { ImagesConsumer } from './images.processor';
import { ImagesService } from './images.service';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'images',
    }),
    HttpModule,
    MulterModule,
  ],
  controllers: [ImagesController],
  providers: [ImagesService, ImagesConsumer],
})
export class ImagesModule {}
