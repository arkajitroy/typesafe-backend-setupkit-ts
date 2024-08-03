import {
  changeCurrentPassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from './user.controller';

export const APIControllers = {
  user: {
    register: registerUser,
    login: loginUser,
    logout: logoutUser,
    changePassword: changeCurrentPassword,
    currentUser: getCurrentUser,
    refreshToken: refreshAccessToken,
    // updateAccountDetails: updateAccountDetails,
  },
};
