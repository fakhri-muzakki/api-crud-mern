import './setup';
import request from 'supertest';
import app from '../../app';
import { userTestHelpers } from './helpers';

describe('GET /api/users', () => {
  describe('Success Cases', () => {
    it('should return users with pagination meta', async () => {
      await userTestHelpers.createUser({
        email: 'get-test@example.com',
        name: 'User to Update',
      });

      const res = await request(app).get('/api/users');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('message', 'Get user successfully');
      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('meta');

      expect(Array.isArray(res.body.data)).toBe(true);

      if (res.body.data.length > 0) {
        const user = res.body.data[0];

        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('name');
        expect(user).toHaveProperty('gender');
        expect(user).toHaveProperty('createdAt');
        expect(user).toHaveProperty('updatedAt');
      }
    });
  });

  describe('Failed Cases', () => {
    it('should return 400 if page is not a number', async () => {
      const res = await request(app).get('/api/users?page=abc');

      expect(res.status).toBe(400);
      expect(res.body).toMatchObject({
        success: false,
        message: expect.any(String),
      });
    });

    it('should return 400 if limit is not a number', async () => {
      const res = await request(app).get('/api/users?limit=xyz');

      expect(res.status).toBe(400);
      expect(res.body).toMatchObject({
        success: false,
        message: 'Validation error',
        errors: ['Limit must be a number'],
      });
    });

    it('should return 400 if page is less than 1', async () => {
      const res = await request(app).get('/api/users?page=0');

      expect(res.status).toBe(400);
      expect(res.body).toMatchObject({
        success: false,
        message: 'Validation error',
        errors: ['Page must be at least 1'],
      });
    });

    it('should return 400 if limit is less than 1', async () => {
      const res = await request(app).get('/api/users?limit=0');

      expect(res.status).toBe(400);
      expect(res.body).toMatchObject({
        success: false,
        message: 'Validation error',
        errors: ['Limit must be at least 1'],
      });
    });
  });

  describe('Edge Cases', () => {
    it('should return empty array when database has no users', async () => {
      const res = await request(app).get('/api/users').expect(200);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message', 'Get user successfully');
      expect(res.body).toHaveProperty('data', []);
    });
  });
});
