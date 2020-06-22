import { router as userRouter } from './user';
import { router as simulationResultRouter } from './simulationResult';
import { router as loginRouter } from './login';
import { router as apiKeyRouter } from './apiKey';
import { Router } from 'express';

export const router: Router = Router({mergeParams: true});
router.use('/user', userRouter);
router.use('/simulationResult', simulationResultRouter);
router.use('/login', loginRouter);
router.use('/apiKey', apiKeyRouter);