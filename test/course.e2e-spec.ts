import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { execSync } from 'child_process';
import { loginTestQuery } from './conf/query/login.test-query';
import { UserAdminOne } from './conf/test-utils/user.test-utils';
import { findAllCourseTestQuery } from './conf/query/course.test-query';
import { AuthResponse } from '../src/auth/entities/auth-response.entity';

describe('Course (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    execSync('yarn prisma migrate reset -f');
    execSync('yarn run seed:test');
  }, 20000);

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return a list of courses', async () => {
    const loginQuery = loginTestQuery({
      email: UserAdminOne.email,
      password: 'password123',
    });
    const authResponse: AuthResponse = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: loginQuery })
      .then((res) => res.body.data.login);

    const query = findAllCourseTestQuery();
    return request(app.getHttpServer())
      .post('/graphql')
      .set({ Authorization: `Bearer ${authResponse.token}` })
      .send({ query })
      .expect((response) => {
        const data = response.body.data;
        expect(data).toHaveProperty('findAllCourse');
        expect(data.findAllCourse).toBeInstanceOf(Array);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
