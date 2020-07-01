import { Router } from 'express';
import * as statisticController from '../controllers/statistic';

export const router: Router = Router({ mergeParams: true});

router.get('/', statisticController.index);
router.get('/:id', statisticController.show);
