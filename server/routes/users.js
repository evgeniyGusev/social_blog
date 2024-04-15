import { Router } from 'express';

import checkAuth from '../utils/checkAuth.js';

import {
  getNewUsersController,
  getUserByIdController,
  addUserToFriendsController,
  removeUserFromFriendsController,
} from '../controllers/users.js';

const usersRouter = new Router();

usersRouter.get('/new', checkAuth, getNewUsersController);
usersRouter.get('/:id', checkAuth, getUserByIdController);
usersRouter.post('/add_friend', checkAuth, addUserToFriendsController);
usersRouter.post('/remove_friend', checkAuth, removeUserFromFriendsController);

export default usersRouter;
