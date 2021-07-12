import { Processor, Process } from '@nestjs/bull';
import { HttpService, Logger } from '@nestjs/common';
import { Job } from 'bull';
import FormData from 'form-data';
import Jimp from 'jimp';

class ConvertirJob {
  file: Express.Multer.File;
  referential?: string;
}

@Processor('images')
export class ImagesConsumer {
  private readonly logger = new Logger(ImagesConsumer.name);
  constructor(private httpService: HttpService) {}

  @Process('convertir')
  async convertir(job: Job<ConvertirJob>) {
    this.logger.debug(`\nStart transcoding... `);
    const file = job.data.file;

    const buffer = Buffer.from(file.buffer);
    const image = await Jimp.read(buffer);

    if (!image) throw new Error('Something wrong when transcoding the file');

    image.grayscale();
    image.resize(500, Jimp.AUTO);
    const formData = new FormData();
    const fileBuffer = await image.getBufferAsync(image.getMIME());
    formData.append('file', fileBuffer, {
      filename: file.originalname,
    });

    if (job.data.referential) {
      formData.append('referential', job.data.referential);
    }
    // 'https://hook.integromat.com/f98qqf458hx2lm3lxsh0o117efoncykr',
    // 'https://hook.integromat.com/aax2pq67wuw8alkx5wk1dy2tk92no6by',
    // ('https://blue-snail-16.hooks.n8n.cloud/d51347fc-67f2-4bfe-bb6a-8bed740c7944');

    try {
      await this.httpService
        .post(
          'https://d96b2oov18iqb3ysa6y7h4ps.hooks.n8n.cloud/webhook-test/d51347fc-67f2-4bfe-bb6a-8bed740c7944',
          formData,
          {
            headers: formData.getHeaders(),
          },
        )
        .toPromise();
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }

    this.logger.debug('Transcoding completed');
  }
}
