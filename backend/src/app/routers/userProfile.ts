import { Router } from "express";
import * as userProfileController from '../controllers/userProfile'

export const router: Router = Router({ mergeParams: true });

router.put('/:id', userProfileController.userUpdateAuthorization, userProfileController.update);