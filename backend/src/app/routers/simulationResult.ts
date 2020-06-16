import { Router } from 'express';
import * as simulationResultController from '../controllers/simulationResult';

export const router:Router = Router({ mergeParams: true });

router.get('/simulationResult', simulationResultController.index);
router.get('/simulationResult/:id', simulationResultController.show);
router.post('/simulationResult', simulationResultController.initialize);
router.put('/simulationResult/:id', simulationResultController.update);