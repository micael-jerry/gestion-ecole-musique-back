import { BadRequestException, Injectable } from '@nestjs/common';
import { PictureInput } from '../dto/picture.input';

@Injectable()
export class PictureValidator {
  private imgValidExtension: string[] = ['.jpg', '.jpeg', '.png'];

  validate(pictureInput: PictureInput) {
    const imgExtension = pictureInput.filename.split('.').pop();
    if (!this.imgValidExtension.includes(imgExtension)) {
      throw new BadRequestException('Invalid image file format');
    }
  }
}
