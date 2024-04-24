import userUpdatePasswordService from "../../services/userUpdatePasswordService.js";

const userUpdatePasswordController = async (req, res) => {
  try {
    const { id, newPassword } = req.body;
    const result = await userUpdatePasswordService.updatePassword(id, newPassword);
    if (result.success) {
      return res.send('Password updated');
    } else {
      return res.status(401).send({ errors: ['Unauthorized user'] });
    }
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).send({ errors: ['Internal Server Error'] });
  }
};

export default userUpdatePasswordController;
