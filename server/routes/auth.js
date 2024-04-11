import { Router } from 'express';

import {
  signInController,
  signUpController,
  signOutController,
  updateUserController,
  currentUserController,
} from '../controllers/auth.js';

import { signUpValidation, signInValidation } from '../validations/auth.js';
import checkAuth from '../utils/checkAuth.js';
import { upload } from '../utils/multer.js';

const authRouter = new Router();

authRouter.post(
  '/sign_up',
  ...signUpValidation,
  upload.single('avatar'),
  signUpController
);
authRouter.post('/sign_in', ...signInValidation, signInController);
authRouter.get('/me', checkAuth, currentUserController);
authRouter.get('/sign_out', checkAuth, signOutController);
authRouter.put('/update_user', checkAuth, updateUserController);

export default authRouter;
