import './setup';
import request from 'supertest';
import app from '../../app';
import { userTestHelpers } from './helpers';

describe('POST /api/users', () => {
  describe('Success cases', () => {
    it('should create user successfully', async () => {
      const payload = {
        email: 'create_test@gmail.com',
        name: 'Create Test',
        gender: 'FEMALE',
      };

      const res = await request(app).post('/api/users').send(payload);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('message', 'User created successfully');
    });
  });

  describe('Failed cases', () => {
    it('should fail when email already exists', async () => {
      await userTestHelpers.createUser({
        email: 'duplicate@example.com',
        name: 'Existing User',
      });

      const payload = {
        email: 'duplicate@example.com',
        name: 'Duplicate User',
        gender: 'MALE',
      };

      const res = await request(app).post('/api/users').send(payload);

      expect(res.status).toBe(409);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('code', 'P2002');
    });

    it('should fail when payload is empty', async () => {
      const res = await request(app).post('/api/users').send({});

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('message');
    });

    it('should fail when required fields are missing', async () => {
      const payload = {
        email: 'missing-name@example.com',
      };

      const res = await request(app).post('/api/users').send(payload);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('message');
    });

    it('should fail when gender value is invalid', async () => {
      const payload = {
        email: 'invalid-gender@example.com',
        name: 'Invalid Gender',
        gender: 'UNKNOWN',
      };

      const res = await request(app).post('/api/users').send(payload);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('message');
    });
  });
});
