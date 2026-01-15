import { type NextFunction, type Request, type Response } from 'express';
import {
  addUser,
  deleteUserByIdService,
  getUserCollectionService,
  updateUserByIdService,
} from '../services/user.service';

export const getUserCollection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const limit = Number(query.limit) || 5;
    const page = Number(query.page) >= 1 ? Number(query.page) : 1;
    const skip = (page - 1) * limit;
    const { data, total } = await getUserCollectionService(limit, skip);

    return res.status(200).json({
      success: true,
      message: 'Get user successfully',
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body;
    const newUser = await addUser(user);

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const params = req.params;
    await deleteUserByIdService(params.id);

    return res.status(200).json({
      success: true,
      message: 'Delete user successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const params = req.params;
    const body = req.body;

    const data = await updateUserByIdService({ ...body, id: params.id });
    return res.status(200).json({
      success: true,
      message: 'Update user successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};
