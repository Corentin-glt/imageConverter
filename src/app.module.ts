import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ImagesModule } from './images/images.module';
@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: async () => ({
        redis: {
          host: 'localhost',
          port: 6379,
        },
      }),
    }),
    ImagesModule,
  ],
})
export class AppModule {}
