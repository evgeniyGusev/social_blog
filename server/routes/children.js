import { Router } from 'express';

import { getChildByIdController } from '../controllers/children.js';

const childrenRouter = new Router();

childrenRouter.get('/child/:id', getChildByIdController);

export default childrenRouter;
