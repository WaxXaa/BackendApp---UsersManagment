import userModel from '../models/userModel.js'
const userUpdatePasswordService = async (userId, password, newPassword) => {
  try {
    const user = await userModel.getUserInfoById(userId);
    if (!user) return { success: false };

    const passwordMatch = await bcrypt.compare(password, hash);
    if (!passwordMatch) return { success: false };

    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const salt = await bcrypt.genSalt(saltRounds);
    const newPasswordHash = await bcrypt.hash(newPassword, salt)
    await userModel.updatePassword(userId, newPasswordHash);

    return { success: true };
  } catch (error) {
    console.error("Error updating password:", error);
    return { success: false, error: 'Internal Server Error' };
  }
}
export default userUpdatePasswordService;
