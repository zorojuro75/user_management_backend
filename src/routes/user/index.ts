import { Router } from 'express';
import getUsersRoute from './getUsers';
import block from '../user/block';
import unblock from '../user/unblock';
import deleteUser from '../user/delete';
import { authenticateJWT, authAndBlockCheck } from '../../middleware';

const router = Router();

router.use(getUsersRoute);
router.use(authenticateJWT, authAndBlockCheck, block);
router.use(authenticateJWT, authAndBlockCheck, unblock);
router.use(authenticateJWT, authAndBlockCheck, deleteUser);

export default router;