import { Router } from 'express';
import { sendMail } from '../controllers/sendmail';

export const router:Router = Router({ mergeParams: true });

router.put('/:id', sendMail);

