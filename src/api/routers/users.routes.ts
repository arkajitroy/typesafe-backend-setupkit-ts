import { Router } from 'express';
import { APIControllers } from '../controllers';
import { RouterMiddleware } from '../../middlewares/router.middleware';
import { routeValidators } from '../validators';
import { uploadMiddleware } from '../../middlewares/multer.middleware';
import { verifyToken } from '../../middlewares/auth.middleware';

export const UserRouter = Router();

UserRouter.route('/register').post(
  uploadMiddleware.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
  ]),
  RouterMiddleware(routeValidators.users.registerUser),
  APIControllers.user.register,
);

UserRouter.route('/login').post(RouterMiddleware(routeValidators.users.loginUser), APIControllers.user.login);
UserRouter.route('/logout').post(verifyToken, APIControllers.user.logout);
