import { Router } from "express";
import * as userController from '../controllers/user';
import * as userProfileController from '../controllers/userProfile'

export const router: Router = Router({ mergeParams: true });

router.put('/:id', userProfileController.userUpdateAuthorization, userController.update);