import { router as userRouter } from './user';
import { router as simulationResultRouter } from './simulationResult';
import { router as loginRouter } from './login';
import { router as apiKeyRouter } from './apiKey';
import { router as userProfileRouter } from './userProfile';
import { router as authWithApiKeyRouter } from './authorizationWithApiKey';
import { router as statisticRouter } from './statistic';
import { router as customFilterRouter } from './customFilter';
import { Router } from 'express';
import { router as mailerRouter } from './mailer';

export const router: Router = Router({mergeParams: true});
router.use('/api/user/profile', userProfileRouter);
router.use('/api/user', userRouter);
router.use('/api/simulationResult', mailerRouter);
router.use('/api/simulationResult', authWithApiKeyRouter, simulationResultRouter);
router.use('/api/login', loginRouter);
router.use('/api/apiKey', apiKeyRouter);
router.use('/api/statistic', statisticRouter);
router.use('/api/customFilter', customFilterRouter);