import { Router } from 'express';

import checkAuth from '../utils/checkAuth.js';

import { addNewPostController } from '../controllers/posts.js';

const postsRouter = new Router();

postsRouter.post('/new', checkAuth, addNewPostController);

export default postsRouter;
