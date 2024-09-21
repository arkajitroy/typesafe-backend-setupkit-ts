import { applicationHealth, applicationRunning } from './app.controller';
import {
  changeCurrentPassword,
  getCurrentUser,
  getUserChannelProfile,
  getWatchHistory,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  updateUserAvatarImage,
  updateUserCoverImage,
} from './user.controller';

export const APIControllers = {
  application: {
    running: applicationRunning,
    health: applicationHealth,
  },
  user: {
    register: registerUser,
    login: loginUser,
    logout: logoutUser,
    changePassword: changeCurrentPassword,
    currentUser: getCurrentUser,
    refreshToken: refreshAccessToken,
    updateProfile: updateAccountDetails,
    updateAvatar: updateUserAvatarImage,
    updateCover: updateUserCoverImage,
    userChannelProfile: getUserChannelProfile,
    watchHistory: getWatchHistory,
  },
};
