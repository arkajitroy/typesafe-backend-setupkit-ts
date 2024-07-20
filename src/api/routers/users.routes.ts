import { Router } from 'express';
import { APIControllers } from '../controllers';
import { RouterMiddleware } from '../../middlewares/router.middleware';
import { routeValidators } from '../validators';

export const UserRouter = Router();

UserRouter.route('/register').post(RouterMiddleware(routeValidators.users.registerUser), APIControllers.user.register);
