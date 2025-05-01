import request from 'supertest';
import app from '../../../../application';
import * as bcrypt from 'bcryptjs';
import prisma from '../../../../src/services/prisma/prisma';
import { generateToken } from '../../../../src/helpers/jwt';
import { HTTP_CREATED, HTTP_OK } from '../../../../src/constants/statusCode';

describe('User Controller', () => {
  let authToken = null;
  let newUser = {
    id: null,
    name: 'New User',
    email: 'new.user@example.com',
    fatherName: 'New User Father',
    motherName: 'New User Mother',
    password: '12345678',
    phoneNo: '01848567876',
  };
  let testUser = {
    name: 'Test User',
    email: 'test.user@example.com',
    password: '12345678',
  };

  beforeAll(async () => {
    await prisma.user.deleteMany({
      where: {
        email: {
          in: [testUser.email, newUser.email],
        }
      }
    });

    const user = await prisma.user.create({
      data: {
        name: testUser.name,
        email: testUser.email,
        password: await bcrypt.hash(testUser.password, 10),
      },
    });

    authToken = generateToken(user.id, user.email);
  });

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        email: {
          in: [testUser.email, newUser.email]
        }
      }
    });
  });

  describe('GET /api/v1/users', () => {
    it('should return all users', async () => {
      const response = await request(app)
        .get('/api/v1/users')
        .set('x-access-token', authToken);

      expect(response.status).toBe(HTTP_OK);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('POST /api/v1/users', () => {
    it('should create a new user data', async () => {
      const response = await request(app)
        .post('/api/v1/users')
        .set('x-access-token', authToken)
        .send(newUser);

      newUser.id = response.body.data.id;

      expect(response.status).toBe(HTTP_CREATED);
      expect(response.body.data.name).toBe(newUser.name);
      expect(response.body.data.email).toBe(newUser.email);
    });
  });

  describe('GET /api/v1/users/:id', () => {
    it('should return a user by id', async () => {
      const response = await request(app)
        .get(`/api/v1/users/${newUser.id}`)
        .set('x-access-token', authToken);

      expect(response.status).toBe(HTTP_OK);
      expect(response.body.data.id).toBe(newUser.id);
    });
  });

  describe('PUT /api/v1/users/:id', () => {
    it('should update a user by id', async () => {
      const response = await request(app)
        .put(`/api/v1/users/${newUser.id}`)
        .set('x-access-token', authToken)
        .send(newUser);

      expect(response.status).toBe(HTTP_CREATED);
      expect(response.body.data.id).toBe(newUser.id);
    });
  });

  describe('DELETE /api/v1/users/:id', () => {
    it('should delete a user by id', async () => {
      const response = await request(app)
        .delete(`/api/v1/users/${newUser.id}`)
        .set('x-access-token', authToken);

      expect(response.status).toBe(HTTP_OK);
      expect(response.body.data.id).toBe(newUser.id);
    });
  });

});
