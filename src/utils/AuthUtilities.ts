import bcrypt from 'bcrypt';

export const generateHashedPassword = async (rawPassword: string): Promise<string> => {
  const saltRoundsValue = 15;
  const hashedPassword = bcrypt.hash(rawPassword, saltRoundsValue);
  return hashedPassword;
};

export async function isPasswordCorrect(storedPassword: string, inputPassword: string): Promise<boolean> {
  return await bcrypt.compare(inputPassword, storedPassword);
}
