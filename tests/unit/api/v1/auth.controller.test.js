import request from 'supertest';
import app from '../../../../application';
import prisma from '../../../../src/services/prisma/prisma';
import { HTTP_CREATED, HTTP_OK } from '../../../../src/constants/statusCode';

describe('Auth Controller', () => {
  let testUser = {
    name: 'Test User',
    email: 'test.user@example.com',
    password: '12345678',
  };

  beforeAll(async () => {
    await prisma.user.deleteMany({
      where: {
        email: testUser.email,
      },
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        email: testUser.email,
      },
    });
  });

  describe('POST /api/v1/register', () => {
    it('should register a user', async () => {
      const response = await request(app)
        .post('/api/v1/register')
        .send(testUser);

      expect(response.status).toBe(HTTP_CREATED);
      expect(response.body.data.token).toBeDefined();
      expect(response.body.data.user).toBeDefined();
      expect(response.body.data.user.email).toBe(testUser.email);
    });
  });

  describe('POST /api/v1/login', () => {
    it('should login a user', async () => {
      const response = await request(app)
        .post('/api/v1/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        });

      expect(response.status).toBe(HTTP_OK);
      expect(response.body.data.token).toBeDefined();
      expect(response.body.data.user).toBeDefined();
      expect(response.body.data.user.email).toBe(testUser.email);
    });
  });

});
