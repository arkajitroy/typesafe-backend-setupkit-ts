import { Router } from 'express';
import { APIControllers } from '../controllers';
import { RouterMiddleware } from '../../middlewares/router.middleware';
import { routeValidators } from '../validators';
import { uploadMiddleware } from '../../middlewares/multer.middleware';

export const UserRouter = Router();

UserRouter.route('/register').post(
  RouterMiddleware(routeValidators.users.registerUser),
  uploadMiddleware.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
  ]),
  APIControllers.user.register,
);
