import { Router } from "express";
import * as apiKeyController from '../controllers/apiKey';

export const router: Router = Router({ mergeParams: true });

router.get('/', apiKeyController.index);
router.get('/:id', apiKeyController.show);
router.post('/', apiKeyController.create);
router.put('/:id', apiKeyController.update);
router.delete('/:id', apiKeyController.destroy);