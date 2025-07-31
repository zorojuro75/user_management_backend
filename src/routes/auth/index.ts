import { Router } from 'express';
import login from './login';
import register from './register';
import block from './block';
import unblock from './unblock';
import deleteUser from './delete';

const router = Router();

router.use(login);
router.use(register);
router.use(block);
router.use(unblock);
router.use(deleteUser);

export default router;
