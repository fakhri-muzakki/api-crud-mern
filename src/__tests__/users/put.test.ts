import './setup';
import app from '../../app';
import request from 'supertest';
import { userTestHelpers } from './helpers';

describe('PUT /api/users/:id', () => {
  describe('Success cases', () => {
    it('should update user successfully', async () => {
      const user = await userTestHelpers.createUser({
        email: 'put-test@example.com',
        name: 'User to Update',
      });

      const updatePayload = {
        email: 'updated_put_test@gmail.com',
        name: 'Updated Put Test',
        gender: 'MALE',
      };

      const res = await request(app)
        .put(`/api/users/${user.id}`)
        .send(updatePayload);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('message', 'Update user successfully');
    });
  });

  describe('Failed cases', () => {
    it('should fail when user does not exist', async () => {
      const nonExistingId = '1234567890123456789012345';
      const res = await request(app).put(`/api/users/${nonExistingId}`).send({
        name: 'Not Found',
      });

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('message', 'Data tidak ditemukan');
    });

    it('should fail when email already exists', async () => {
      await userTestHelpers.createUser({
        email: 'existing@example.com',
        name: 'Existing User',
      });

      const userToUpdate = await userTestHelpers.createUser({
        email: 'to-update@example.com',
        name: 'To Update',
      });

      const res = await request(app).put(`/api/users/${userToUpdate.id}`).send({
        email: 'existing@example.com',
      });

      expect(res.status).toBe(409);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('message', 'email sudah terdaftar');
    });

    it('should fail when id format is invalid', async () => {
      const res = await request(app).put('/api/users/123').send({
        name: 'Invalid ID',
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('message', 'Validation error');
    });

    it('should fail when payload is empty', async () => {
      const user = await userTestHelpers.createUser({
        email: 'put-test2@example.com',
        name: 'User to Update',
      });

      const res = await request(app).put(`/api/users/${user.id}`).send({});

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('success', false);
    });

    it('should fail when gender value is invalid', async () => {
      const user = await userTestHelpers.createUser();

      const res = await request(app).put(`/api/users/${user.id}`).send({
        gender: 'UNKNOWN',
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('success', false);
    });
  });
});
