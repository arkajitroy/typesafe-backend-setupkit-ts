import { loginUser, registerUser, resetPassword, updateProfile } from './users.validator';

export const routeValidators = {
  users: {
    registerUser,
    loginUser,
    resetPassword,
    updateProfile,
  },
};
