import userUpdateNamesService from '../../services/updateUserNamesService.js'
const userUpdateNamesController = async (req, res) => {
  try {
    const { userId, new_fname, new_lname, new_userName } = req.body;
    const result = await userUpdateNamesService({ userId, new_fname, new_lname, new_userName });

    return res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    const status = error.status
    return res.status(status || 500).json({ success: false, message: error.message || "Internal server error." });
  }
}
export default userUpdateNamesController





