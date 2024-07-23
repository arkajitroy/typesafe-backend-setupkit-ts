import { loginUser, registerUser } from './users.validator';

export const routeValidators = {
  users: {
    registerUser,
    loginUser,
  },
};
