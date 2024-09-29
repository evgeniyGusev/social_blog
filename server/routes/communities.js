import { Router } from 'express';

import {
  getCommunitiesController,
  getCommunityByIdController,
  createNewCommunity,
} from '../controllers/communities.js';

const childrenRouter = new Router();

childrenRouter.get('/', getCommunitiesController);
childrenRouter.get('/:id', getCommunityByIdController);
childrenRouter.post('/create', createNewCommunity);

export default childrenRouter;
