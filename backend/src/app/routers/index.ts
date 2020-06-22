import { router as userRouter } from './user';
import { router as simulationResultRouter } from './simulationResult';
import { router as loginRouter } from './login';
import { router as apiKeyRouter } from './apiKey';
import { Router } from 'express';

export const router: Router = Router({mergeParams: true});
router.use('/api/user', userRouter);
router.use('/api/simulationResult', simulationResultRouter);
router.use('/api/login', loginRouter);
router.use('/api/apiKey', apiKeyRouter);