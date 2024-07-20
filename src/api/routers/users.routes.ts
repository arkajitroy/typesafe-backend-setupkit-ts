import { Router } from 'express';
import { APIControllers } from '../controllers';

export const UserRouter = Router();

UserRouter.route('/register').post(APIControllers.user.register);
