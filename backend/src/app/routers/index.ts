import { router as userRouter } from './user';
import { router as simulationResultRouter } from './simulationResult';
import { router as loginRouter } from './login';
import { router as apiKeyRouter } from './apiKey';
import { router as authWithApiKeyRouter } from './authorizationWithApiKey';
import { Router } from 'express';
import { router as mailerRouter } from './mailer';

export const router: Router = Router({mergeParams: true});
router.use('/api/user', userRouter);
router.use('/api/simulationResult', mailerRouter);
router.use('/api/simulationResult', authWithApiKeyRouter, simulationResultRouter);
router.use('/api/login', loginRouter);
router.use('/api/apiKey', apiKeyRouter);