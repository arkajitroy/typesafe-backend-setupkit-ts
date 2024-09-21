import { Router } from 'express';
import { APIControllers } from '../controllers';

export const ServerRouter = Router();

ServerRouter.get('/', APIControllers.application.running);
ServerRouter.get('/matrix-status', APIControllers.application.health);
