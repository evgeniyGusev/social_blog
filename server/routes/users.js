import { Router } from 'express';

import checkAuth from '../utils/checkAuth.js';

import {
  getNewUsersController,
  getUserByIdController,
  addUserToFriendsController,
} from '../controllers/users.js';

const usersRouter = new Router();

usersRouter.get('/new', checkAuth, getNewUsersController);
usersRouter.get('/:id', checkAuth, getUserByIdController);
usersRouter.post('/add_friend', checkAuth, addUserToFriendsController);

export default usersRouter;
