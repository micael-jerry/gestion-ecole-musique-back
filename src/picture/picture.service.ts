import { Injectable } from '@nestjs/common';
import * as Upload from 'graphql-upload/Upload.js';
import { createWriteStream, existsSync, mkdirSync, unlink } from 'fs';
import { join } from 'path';

@Injectable()
export class PictureService {
  async upload(file: Upload): Promise<string | null> {
    if (!file) return null;

    return new Promise((resolve, reject) => {
      const dirPath = join(__dirname, '..', '..', 'uploads');
      const fileName = `${Date.now()}_${file.filename}`;
      if (!existsSync(dirPath)) {
        mkdirSync(dirPath, { recursive: true });
      }
      file
        .createReadStream()
        .pipe(createWriteStream(`${dirPath}/${fileName}`))
        .on('finish', () => resolve(fileName))
        .on('error', (error) => reject(new Error(`File not upload ${error}`)));
    });
  }

  remove(fileName: string) {
    if (!fileName) return;
    const filePath = join(__dirname, '..', '..', 'uploads', fileName);
    return unlink(filePath, (err) => {
      if (err) throw err;
      console.log(`${filePath} was deleted`);
    });
  }

  async update(oldFileName: string, file: Upload): Promise<string | null> {
    if (!file) return null;
    const newFileName: string | null = await this.upload(file);
    this.remove(oldFileName);
    return newFileName;
  }
}
