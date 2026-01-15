import { type NextFunction, type Request, type Response } from 'express';

export const getUserCollection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({
      success: true,
      message: 'All users successfully acquired.',
    });
  } catch (error) {
    next(error);
  }
};
