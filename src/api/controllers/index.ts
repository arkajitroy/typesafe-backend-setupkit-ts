import {
  changeCurrentPassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
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
  },
};
