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
UserRouter.route('/reset-password').post(
  verifyToken,
  RouterMiddleware(routeValidators.users.resetPassword),
  APIControllers.user.changePassword,
);
UserRouter.route('/refresh-token').post(APIControllers.user.refreshToken);
UserRouter.route('/current-user').get(verifyToken, APIControllers.user.currentUser);
UserRouter.route('/update-account').patch(
  verifyToken,
  RouterMiddleware(routeValidators.users.updateProfile),
  APIControllers.user.updateProfile,
);
UserRouter.route('/update-avatar').patch(
  verifyToken,
  uploadMiddleware.single('avatar'),
  APIControllers.user.updateAvatar,
);
UserRouter.route('/update-cover').patch(
  verifyToken,
  uploadMiddleware.single('coverImage'),
  APIControllers.user.updateCover,
);
UserRouter.route('/user-channel-profile-info').get(verifyToken, APIControllers.user.userChannelProfile);
UserRouter.route('/watch-history').get(verifyToken, APIControllers.user.watchHistory);
