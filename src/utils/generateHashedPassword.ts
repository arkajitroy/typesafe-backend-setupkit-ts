import bcrypt from 'bcrypt';

export const generateHashedPassword = async (rawPassword: string): Promise<string> => {
  const saltRoundsValue = 15;
  const hashedPassword = bcrypt.hash(rawPassword, saltRoundsValue);
  return hashedPassword;
};
