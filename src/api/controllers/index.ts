import { loginUser, logoutUser, registerUser } from './user.controller';

export const APIControllers = {
  user: {
    register: registerUser,
    login: loginUser,
    logout: logoutUser,
  },
};
