import { Router } from 'express';
import {
  createUser,
  deleteUserById,
  getUserCollection,
  updateUserById,
} from '../controllers/user.controller';
import { validate } from '../middlewares/validate';
import {
  createUserSchema,
  idParamSchema,
  paginationSchema,
  updateUserSchema,
} from '../validations/user.validation';

const router = Router();
router.get('/', validate(paginationSchema, 'query'), getUserCollection);
router.post('/', validate(createUserSchema, 'body'), createUser);
router.delete('/:id', validate(idParamSchema, 'params'), deleteUserById);
router.put(
  '/:id',
  validate(idParamSchema, 'params'),
  validate(updateUserSchema, 'body'),
  updateUserById
);

export default router;
