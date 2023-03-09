import bcrypt from 'bcrypt';

const comparePassword = async (
  passwordUser: string,
  candidatePassword: string
): Promise<boolean> => {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, passwordUser);
    return isMatch;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    return false;
  }
};

export default comparePassword;
