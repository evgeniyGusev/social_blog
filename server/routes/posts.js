import { Router } from 'express';

import checkAuth from '../utils/checkAuth.js';

import {
  addNewPostController,
  getUserPostsController,
  getPostsByIdController,
} from '../controllers/posts.js';

const postsRouter = new Router();

postsRouter.post('/new', checkAuth, addNewPostController);
postsRouter.get('/user_posts', checkAuth, getUserPostsController);
postsRouter.get('/:id', checkAuth, getPostsByIdController);

export default postsRouter;
