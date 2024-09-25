import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, unlink, writeFileSync } from 'fs';
import { join } from 'path';
import { PictureInput } from './dto/picture.input';

@Injectable()
export class PictureService {
  private imgValidExtension: string[] = ['jpg', 'jpeg', 'png'];

  async upload(pictureInput: PictureInput): Promise<string | null> {
    if (!pictureInput) return null;
    this.validate(pictureInput);

    const dirPath = join(__dirname, '..', 'uploads');
    const fileName = `${Date.now()}_${pictureInput.filename.trim()}`;

    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true });
    }

    return this.base64ToImage(`${dirPath}/${fileName}`, pictureInput.data).then(
      () => {
        return fileName;
      },
    );
  }

  remove(fileName: string) {
    if (!fileName) return;
    const filePath = join(__dirname, '..', 'uploads', fileName);
    return unlink(filePath, (err) => {
      if (err) throw err;
      console.log(`${filePath} was deleted`);
    });
  }

  async update(
    oldFileName: string,
    pictureInput: PictureInput,
  ): Promise<string | null> {
    if (!pictureInput) return null;
    const newFileName: string | null = await this.upload(pictureInput);
    this.remove(oldFileName);
    return newFileName;
  }

  private async base64ToImage(filePath: string, base64: string): Promise<void> {
    try {
      const buffer: Buffer = Buffer.from(base64, 'base64');
      writeFileSync(filePath, buffer);
      return Promise.resolve();
    } catch (err) {
      throw new BadRequestException('error during image recording');
    }
  }

  private validate(pictureInput: PictureInput) {
    const filenameExtension = pictureInput.filename.split('.').pop();
    const dataType = pictureInput.data.split(';')[0].split('/')[1];
    if (
      !this.imgValidExtension.includes(filenameExtension) ||
      !this.imgValidExtension.includes(dataType) ||
      filenameExtension !== dataType
    ) {
      throw new BadRequestException('Invalid image format');
    }
  }
}
