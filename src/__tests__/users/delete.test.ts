import './setup';
import app from '../../app';
import request from 'supertest';
import { userTestHelpers } from './helpers';

describe('DELETE /api/users/:id', () => {
  describe('Success cases', () => {
    it('should delete user successfully', async () => {
      const user = await userTestHelpers.createUser({
        email: 'delete-test@example.com',
        name: 'User to Delete',
      });

      const res = await request(app).delete(`/api/users/${user.id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('message', 'Delete user successfully');
    });
  });

  describe('Failed cases', () => {
    it('should return 404 if user does not exist', async () => {
      const nonExistingId = '1234567890123456789012345';

      const res = await request(app).delete(`/api/users/${nonExistingId}`);

      expect(res.status).toBe(404);
      expect(res.body).toMatchObject({
        success: false,
        message: expect.any(String),
      });
    });

    it('should return 400 if user id is invalid', async () => {
      const invalidId = 'invalid-id-format';

      const res = await request(app).delete(`/api/users/${invalidId}`);

      expect(res.status).toBe(400);
      expect(res.body).toMatchObject({
        success: false,
        message: expect.any(String),
      });
    });
  });
});
