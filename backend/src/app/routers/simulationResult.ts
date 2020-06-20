import { Router } from 'express';
import * as simulationResultController from '../controllers/simulationResult';

export const router:Router = Router({ mergeParams: true });

router.get('/', simulationResultController.index);
router.get('/:id', simulationResultController.show);
router.post('/', simulationResultController.initialize);
router.put('/:id', simulationResultController.update);
router.delete('/:id', simulationResultController.destroy);
router.put('/:id/invalidate', simulationResultController.invalidate);
