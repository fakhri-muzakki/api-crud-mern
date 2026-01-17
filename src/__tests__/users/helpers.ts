import prisma from '../../libs/prisma';
import { type User } from '../../generated/prisma/client';

export const userTestHelpers = {
  // Connect ke database
  connect: async () => {
    await prisma.$connect();
  },

  // Disconnect dari database
  disconnect: async () => {
    await prisma.$disconnect();
  },

  truncateDatabase: async () => {
    if (process.env.NODE_ENV !== 'test') {
      throw new Error('truncateDatabase only allowed in test environment');
    }

    try {
      // PostgreSQL
      await prisma.$executeRawUnsafe(
        'TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;'
      );
    } catch {
      // Fallback ke deleteMany jika TRUNCATE gagal (misal: SQLite)
      await prisma.user.deleteMany();
    }
  },

  createUser: async (data: Partial<User> = {}) => {
    return await prisma.user.create({
      data: {
        email:
          data.email ||
          `test-${Date.now()}-${Math.random().toString(36).substring(7)}@example.com`,
        name: data.name || 'Test User',
        gender: data.gender || 'MALE',
        ...data,
      },
    });
  },

  createMultipleUsers: async (count: number) => {
    const users: User[] = [];
    for (let i = 0; i < count; i++) {
      const user = await userTestHelpers.createUser({
        email: `user${i}-${Date.now()}@example.com`,
        name: `User ${i + 1}`,
        gender: i % 2 === 0 ? 'MALE' : 'FEMALE',
      });
      users.push(user);
    }
    return users;
  },
};
