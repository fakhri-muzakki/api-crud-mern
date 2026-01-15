import prisma from '../libs/prisma';

interface IUser {
  gender: 'MALE' | 'FEMALE';
  email: string;
  name: string;
}

export const getUserCollectionService = async () => {
  return await prisma.user.findMany();
};

export const addUser = async ({ email, name, gender }: IUser) => {
  // Hash password sebelum disimpan

  // Insert user ke database
  const newUser = await prisma.user.create({
    data: {
      email,
      name: name || null,
      gender,
    },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      // Jangan return password
    },
  });

  return newUser;
};
