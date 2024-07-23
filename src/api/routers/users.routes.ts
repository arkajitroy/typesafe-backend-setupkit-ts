import { Router } from 'express';
import { APIControllers } from '../controllers';
import { RouterMiddleware } from '../../middlewares/router.middleware';
import { routeValidators } from '../validators';
import { uploadMiddleware } from '../../middlewares/multer.middleware';

export const UserRouter = Router();

UserRouter.route('/register').post(
  uploadMiddleware.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
  ]),
  RouterMiddleware(routeValidators.users.registerUser),
  APIControllers.user.register,
);
