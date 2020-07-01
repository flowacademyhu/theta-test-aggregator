import { Router } from 'express';
import * as statisticController from '../controllers/statistic';

export const router: Router = Router({ mergeParams: true});

router.get('/');
router.get('/:id');
router.get('/:endpoint/:method');
router.delete('/:id');