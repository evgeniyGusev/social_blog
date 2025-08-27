import { Router } from 'express';

import checkAuth from '../utils/checkAuth.js';

import {
  addNewPostController,
  getUserPostsController,
  getPostsByIdController,
  getPostsByUserIdController,
} from '../controllers/posts.js';

const postsRouter = new Router();

postsRouter.post('/new', checkAuth, addNewPostController);
postsRouter.get('/user_posts', checkAuth, getUserPostsController);
postsRouter.get('/user_posts/:id', checkAuth, getPostsByIdController);
postsRouter.get('/by_user', checkAuth, getPostsByUserIdController);

export default postsRouter;
