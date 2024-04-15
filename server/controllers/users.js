import UserModel from '../models/User.js';
import { currentUserController } from './auth.js';

export const getNewUsersController = async (req, res) => {
  try {
    const currentUser = await UserModel.findById({ _id: req.userId });
    const users = await UserModel.find({ _id: { $ne: currentUser._id } }).limit(
      5
    );

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

export const getUserByIdController = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ access: false, error: 'Пользователь не найден' });
    }

    const { passwordHash, favs, __v, ...userRes } = user._doc;

    return res.status(200).json({
      access: true,
      user: userRes,
    });
  } catch (e) {
    res.status(404).json({ access: false, error: 'Пользователь не найден' });
  }
};

export const addUserToFriendsController = async (req, res) => {
  try {
    const currentUser = await UserModel.findById(req.userId);
    const user = await UserModel.findById(req.body.id);

    if (!user || !currentUser) {
      return res
        .status(404)
        .json({ access: false, error: 'Пользователь не найден' });
    }

    if (currentUser.friends.includes(user._id)) {
      return res
        .status(404)
        .json({ access: false, error: 'Пользователь уже в друзьях' });
    }

    currentUser.friends = [...currentUser.friends, user._id];
    user.friends = [...user.friends, currentUser._id];

    await currentUser.save();
    await user.save();

    const { passwordHash, ...userRes } = currentUser._doc;

    return res.status(200).json({ access: true, user: userRes });
  } catch (e) {
    res.status(404).json({ access: false, error: e.message });
  }
};

export const removeUserFromFriendsController = async (req, res) => {
  try {
    const currentUser = await UserModel.findById(req.userId);
    const user = await UserModel.findById(req.body.id);

    if (!user || !currentUser) {
      return res
        .status(404)
        .json({ access: false, error: 'Пользователь не найден' });
    }

    if (!currentUser.friends.includes(user._id)) {
      return res.status(404).json({
        access: false,
        error: 'Пользователь в списке друзей не найден',
      });
    }

    currentUser.friends = currentUser.friends.filter(
      (id) => !user._id.equals(id)
    );
    user.friends = user.friends.filter((id) => currentUser._id.equals(id));

    await currentUser.save();
    await user.save();

    const { passwordHash, ...userRes } = currentUser._doc;

    return res.status(200).json({ access: true, user: userRes });
  } catch (e) {
    res.status(404).json({ access: false, error: e.message });
  }
};
