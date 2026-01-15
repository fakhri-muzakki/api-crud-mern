import { Router } from 'express';
import { createUser, getUserCollection } from '../controllers/user.controller';

const router = Router();
router.get('/', getUserCollection);
router.post('/', createUser);

export default router;
