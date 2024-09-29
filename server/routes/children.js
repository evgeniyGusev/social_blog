import { Router } from 'express';

import {
  createNewChild,
  getChildByIdController,
} from '../controllers/children.js';

const childrenRouter = new Router();

childrenRouter.get('/:id', getChildByIdController);
childrenRouter.post('/create', createNewChild);

export default childrenRouter;
