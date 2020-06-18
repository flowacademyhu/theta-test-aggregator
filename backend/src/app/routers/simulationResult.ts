import { Router } from 'express';
import * as simulationResultController from '../controllers/simulationResult';
import { sendMail } from '../controllers/sendmail';

export const router:Router = Router({ mergeParams: true });

router.get('/', simulationResultController.index);
router.get('/:id', simulationResultController.show);
router.post('/', simulationResultController.initialize);
router.use(sendMail);
router.put('/:id', simulationResultController.update);
router.delete('/:id', simulationResultController.destroy);
