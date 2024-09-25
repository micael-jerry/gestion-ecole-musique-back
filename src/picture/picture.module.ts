import { Module } from '@nestjs/common';
import { PictureService } from './picture.service';
import { PictureValidator } from './validator/picture.validator';

@Module({
  providers: [PictureService, PictureValidator],
  exports: [PictureService, PictureValidator],
})
export class PictureModule {}
