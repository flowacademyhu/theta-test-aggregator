import { Router } from "express";
import * as customFilterController from '../controllers/customFilter';

export const router: Router = Router({ mergeParams: true });

router.get('/', customFilterController.index);
router.post('/', customFilterController.create);
router.delete('/:id', customFilterController.destroy);