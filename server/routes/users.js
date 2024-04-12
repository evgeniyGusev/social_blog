import { Router } from 'express';

import checkAuth from '../utils/checkAuth.js';

import {
  getNewUsersController,
  getUserByIdController,
} from '../controllers/users.js';

const usersRouter = new Router();

usersRouter.get('/new', checkAuth, getNewUsersController);
usersRouter.get('/:id', checkAuth, getUserByIdController);

export default usersRouter;
