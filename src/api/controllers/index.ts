import { loginUser, logoutUser, refreshAccessToken, registerUser } from './user.controller';

export const APIControllers = {
  user: {
    register: registerUser,
    login: loginUser,
    logout: logoutUser,
    refreshToken: refreshAccessToken,
  },
};
