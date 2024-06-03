import { Router } from 'express';

import checkAuth from '../utils/checkAuth.js';

import {
  addNewPostController,
  getUserPostsController,
} from '../controllers/posts.js';

const postsRouter = new Router();

postsRouter.post('/new', checkAuth, addNewPostController);
postsRouter.get('/user_posts', checkAuth, getUserPostsController);

export default postsRouter;
