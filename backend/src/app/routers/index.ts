import { router as userRouter } from './user';
import { router as simulationResultRouter } from './simulationResult';
import { router as loginRouter } from './login';
import { Router } from 'express';

export const router: Router = Router({mergeParams: true});
router.use('/user', userRouter);
router.use('/simulationResult', simulationResultRouter);
router.use('/login', loginRouter);