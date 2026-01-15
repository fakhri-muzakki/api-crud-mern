import { Router } from 'express';
import { getUserCollection } from '../controllers/user.controller';

const router = Router();
router.get('/', getUserCollection);

export default router;
