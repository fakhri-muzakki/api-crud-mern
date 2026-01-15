import { type NextFunction, type Request, type Response } from 'express';
import { addUser, getUserCollectionService } from '../services/user.service';

export const getUserCollection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getUserCollectionService();

    return res.status(200).json({
      success: true,
      message: 'Get user successfully.',
      data,
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
