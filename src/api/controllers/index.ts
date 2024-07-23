import { loginUser, registerUser } from './user.controller';

export const APIControllers = {
  user: {
    register: registerUser,
    login: loginUser,
  },
};
