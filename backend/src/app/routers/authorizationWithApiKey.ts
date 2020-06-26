import {Router} from "express";
import * as authWithApiKeyController from '../controllers/authorizationWithApiKey';

export const router: Router = Router({ mergeParams: true });

router.post('/', authWithApiKeyController.authorization);
router.put('/:id', authWithApiKeyController.authorization);