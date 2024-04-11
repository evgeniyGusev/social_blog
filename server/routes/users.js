import { Router } from 'express';

import checkAuth from '../utils/checkAuth.js';

import { getNewUsersController } from '../controllers/users.js';

const usersRouter = new Router();

usersRouter.get('/new', checkAuth, getNewUsersController);

export default usersRouter;
