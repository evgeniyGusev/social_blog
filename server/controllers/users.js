import UserModel from '../models/User.js';

export const getNewUsersController = async (req, res) => {
  try {
    const users = await UserModel.find();

    if (!users) {
      return res
        .status(404)
        .json({ access: false, error: 'Пользователи не найдены' });
    }

    return res.status(200).json({
      success: true,
      data: users.map(({ _id, name, avatar }) => ({ _id, name, avatar })),
    });
  } catch (e) {
    res.status(404).json({ access: false, error: e.message });
  }
};
