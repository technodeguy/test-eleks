import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getConnection } from 'typeorm';

import * as mocks from './mocks';
import { AppModule } from '../src/app.module';
import { Issue } from '../src/issue/issue.entity';
import { StatusType } from '../src/consts';

describe('IssueController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    const connection = await getConnection();
    if (connection.isConnected) {
      await connection.close();
		}
  });

  it('POST /issues - Should successfully create issue', () => {
    const { newIssue } = mocks.mockData;

    return request(app.getHttpServer())
      .post('/issues')
      .send(newIssue)
      .expect(201)
      .expect(({ body }: { body: Issue }) => {
        expect(body.id).toBeDefined();
        expect(body.email).toEqual(newIssue.email);
        expect(body.message).toEqual(newIssue.message);
        expect(body.status).toEqual(StatusType.NEW);
      });
  });
});
