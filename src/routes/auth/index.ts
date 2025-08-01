import { Router } from 'express';
import login from './login';
import register from './register';
import logout from './logout';

const router = Router();


router.use(login);
router.use(register);
router.use(logout);


export default router;
