import UserModel from '../models/User.js';
import { getUsersById } from '../helpers/get_users.js';
import { ApiError } from '../helpers/api_errors.js';

export const getNewUsersController = async (req, res) => {
  try {
    const { currentUser } = await getUsersById({ currentId: req.userId });
    const users = await UserModel.find({ _id: { $ne: currentUser._id } }).limit(
      5
    );

    if (!users) {
      return ApiError.userNotFound(res);
    }

    return res.status(200).json({
      success: true,
      data: users.map(({ _id, name, avatar }) => ({ _id, name, avatar })),
    });
  } catch (e) {
    ApiError.commonServerError(res);
  }
};

export const getUserByIdController = async (req, res) => {
  try {
    const { user } = await getUsersById({ id: req.params.id });

    if (!user) {
      ApiError.userNotFound(res);
    }

    const { passwordHash, favs, __v, invoices, ...userRes } = user._doc;

    return res.status(200).json({
      access: true,
      user: userRes,
    });
  } catch (e) {
    ApiError.commonServerError(res);
  }
};

export const addUserToFriendsController = async (req, res) => {
  try {
    const { currentUser, user } = await getUsersById({
      currentId: req.userId,
      id: req.body.id,
    });

    if (!user || !currentUser) {
      return ApiError.userNotFound(res);
    }

    if (currentUser.friends.includes(user._id)) {
      return res
        .status(404)
        .json({ access: false, error: 'Пользователь уже в друзьях' });
    }

    if (
      user.invoices.in.includes(currentUser._id) ||
      currentUser.invoices.out.includes(user._id)
    ) {
      return res
        .status(404)
        .json({ access: false, error: 'Заявка в друзья уже отправлена' });
    }

    user.invoices.in = [...user.invoices.in, currentUser._id];
    currentUser.invoices.out = [...currentUser.invoices.out, user._id];

    await user.save();
    await currentUser.save();

    const { passwordHash, __v, ...userRes } = currentUser._doc;

    return res.status(200).json({ access: true, user: userRes });
  } catch (e) {
    res.status(500).json({ access: false, error: e.message });
  }
};

export const cancelFriendRequestController = async (req, res) => {
  try {
    const { currentUser, user } = await getUsersById({
      currentId: req.userId,
      id: req.params.id,
    });

    const invoiceOut = currentUser.invoices.out.find((id) =>
      id.equals(user._id)
    );
    const invoiceIn = user.invoices.in.find((id) => id.equals(currentUser._id));

    if (!user || !currentUser || !invoiceOut || !invoiceIn) {
      return res
        .status(404)
        .json({ access: false, error: 'Заявка не найдена' });
    }

    currentUser.invoices.out = currentUser.invoices.out.filter(
      (id) => !id.equals(user._id)
    );
    user.invoices.in = user.invoices.in.filter(
      (id) => !id.equals(currentUser._id)
    );

    await currentUser.save();
    await user.save();

    const { passwordHash, __v, ...userRes } = currentUser._doc;

    return res.status(200).json({ access: true, user: userRes });
  } catch (e) {
    res.status(500).json({ access: false, error: e.message });
  }
};

export const acceptFriendRequestController = async (req, res) => {
  try {
    const { currentUser, user } = await getUsersById({
      currentId: req.userId,
      id: req.params.id,
    });

    if (!user || !currentUser) {
      return ApiError.userNotFound(res);
    }

    if (
      !currentUser.invoices.in.includes(user._id) ||
      !user.invoices.out.includes(currentUser._id)
    ) {
      return res
        .status(404)
        .json({ access: false, error: 'Заявка не найдена' });
    }

    currentUser.invoices.in = currentUser.invoices.in.filter(
      (id) => !id.equals(user._id)
    );
    user.invoices.out = user.invoices.out.filter(
      (id) => !id.equals(currentUser._id)
    );

    currentUser.friends = [...currentUser.friends, user._id];
    user.friends = [...user.friends, currentUser._id];

    await currentUser.save();
    await user.save();

    const { passwordHash, __v, ...userRes } = currentUser._doc;

    return res.status(200).json({ access: true, user: userRes });
  } catch (e) {
    res.status(500).json({ access: false, error: e.message });
  }
};

export const declineFriendRequestController = async (req, res) => {
  try {
    const { currentUser, user } = await getUsersById({
      currentId: req.userId,
      id: req.params.id,
    });

    if (!user || !currentUser) {
      return ApiError.userNotFound(res);
    }

    if (
      !currentUser.invoices.in.includes(user._id) ||
      !user.invoices.out.includes(currentUser._id)
    ) {
      return res
        .status(404)
        .json({ access: false, error: 'Заявка не найдена' });
    }

    currentUser.invoices.in = currentUser.invoices.in.filter(
      (id) => !id.equals(user._id)
    );
    user.invoices.out = user.invoices.out.filter(
      (id) => !id.equals(currentUser._id)
    );

    await currentUser.save();
    await user.save();

    const { passwordHash, __v, ...userRes } = currentUser._doc;

    return res.status(200).json({ access: true, user: userRes });
  } catch (e) {
    res.status(500).json({ access: false, error: e.message });
  }
};

export const removeUserFromFriendsController = async (req, res) => {
  try {
    const { currentUser, user } = await getUsersById({
      currentId: req.userId,
      id: req.body.id,
    });

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
