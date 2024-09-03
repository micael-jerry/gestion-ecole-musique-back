import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { execSync } from 'child_process';
import {
  MusicCategoryOne,
  MusicCategoryTwo,
} from './conf/test-utils/music-category.test-utils';

describe('MusicCategory (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    execSync('yarn prisma migrate reset -f');
    execSync('yarn run seed:test');

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return a list of music categories', () => {
    const query = `
      query FindAllMusicCategory {
        findAllMusicCategory {
          id
          name
          description
        }
      }
    `;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200)
      .expect((response) => {
        const data = response.body.data;
        expect(data).toHaveProperty('findAllMusicCategory');
        expect(data.findAllMusicCategory).toBeInstanceOf(Array);
        expect(data.findAllMusicCategory).toEqual(
          expect.arrayContaining([MusicCategoryOne, MusicCategoryTwo]),
        );
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
