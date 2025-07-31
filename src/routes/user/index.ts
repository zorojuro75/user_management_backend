import { Router } from 'express';
import getUsersRoute from './getUsers';

const router = Router();

router.use(getUsersRoute);

export default router;
