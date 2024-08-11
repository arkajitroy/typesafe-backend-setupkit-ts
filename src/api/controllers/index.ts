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
