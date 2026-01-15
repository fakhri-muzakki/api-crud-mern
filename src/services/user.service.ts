import { type IUser, type ICreateUser } from '../types/user';
import prisma from '../libs/prisma';

export const getUserCollectionService = async (limit: number, skip: number) => {
  const data = await prisma.user.findMany({
    skip,
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
  });

  const total = await prisma.user.count();

  return { data, total };
};

export const addUser = async ({ email, name, gender }: ICreateUser) => {
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
      gender: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return newUser;
};

export const deleteUserByIdService = async (id: string) => {
  await prisma.user.delete({ where: { id } });
};

export const updateUserByIdService = async (data: IUser) => {
  return await prisma.user.update({ where: { id: data.id }, data });
};
