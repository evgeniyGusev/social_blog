import { Router } from 'express';

import checkAuth from '../utils/checkAuth.js';

import {
  getNewUsersController,
  getUserByIdController,
  addUserToFriendsController,
  removeUserFromFriendsController,
  cancelFriendRequestController,
  acceptFriendRequestController,
  declineFriendRequestController,
} from '../controllers/users.js';

const usersRouter = new Router();

usersRouter.get('/new', checkAuth, getNewUsersController);
usersRouter.get('/:id', checkAuth, getUserByIdController);
usersRouter.post('/add_friend', checkAuth, addUserToFriendsController);
usersRouter.post('/remove_friend', checkAuth, removeUserFromFriendsController);
usersRouter.get(
  '/cancel_friend_request/:id',
  checkAuth,
  cancelFriendRequestController
);
usersRouter.get(
  '/accept_friend_request/:id',
  checkAuth,
  acceptFriendRequestController
);
usersRouter.get(
  '/decline_friend_request/:id',
  checkAuth,
  declineFriendRequestController
);

export default usersRouter;
