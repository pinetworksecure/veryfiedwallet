import * as bcrypt from "bcrypt";

export const bcryptPassword = async (password: string): Promise<string> => {
  try {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  } catch (err) {
    console.error("Error hashing password", err);
    throw err;
  }
};

export const comparePassword = async (
  password: string,
  hashPassword: string
): Promise<boolean> => {
  try {
    const result = await bcrypt.compare(password, hashPassword);
    return result;
  } catch (err) {
    console.error("Error comparing passwords", err);
    throw err;
  }
};
