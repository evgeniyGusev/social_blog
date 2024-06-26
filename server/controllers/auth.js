import { validationResult } from 'express-validator';
import bcryptjs from 'bcryptjs';

import UserModel from '../models/User.js';
import { generateToken } from '../utils/token.js';

// signUp
export const signUpController = async (req, res) => {
  try {
    const errors = validationResult(req.body);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: errors.errors?.[0]?.msg || 'Не валидные данные',
      });
    }

    const { email, password, name } = req.body;

    console.log(req.file);

    let avatar = req.file?.originalname ?? req.body.avatar;

    if (!avatar) {
      avatar = 'default.svg';
    }

    const salt = bcryptjs.genSaltSync(10);
    const passwordHash = bcryptjs.hashSync(password, salt);

    const newUser = new UserModel({
      email,
      passwordHash,
      name,
      avatar,
      favs: [],
      friends: [],
    });

    await newUser.save();

    res.status(201).json({
      success: true,
    });
  } catch (e) {
    if (e.keyPattern.email) {
      return res
        .status(400)
        .json({ success: false, error: 'Email уже используется' });
    }

    res.status(500).json({ success: false, error: e.message });
  }
};

// signIn
export const signInController = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ access: false, error: 'Неверный логин или пароль' });
    }

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      if (bcryptjs.compareSync(password, user.passwordHash)) {
        const token = generateToken(user._id);

        res.set(
          'Set-Cookie',
          `access_token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}`
        );

        return res.json({
          access: true,
        });
      }

      return res
        .status(400)
        .json({ access: false, error: 'Неверный логин или пароль' });
    }

    return res
      .status(400)
      .json({ access: false, error: 'Неверный логин или пароль' });
  } catch (e) {
    res.status(500).json({ access: false, error: e.message });
  }
};

// updateUser
export const updateUserController = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (user) {
      user.wallets = [...user.wallets, ...req.body.wallets];

      await user.save();

      const { passwordHash, ...userRes } = user._doc;

      return res.json({
        access: true,
        user: userRes,
      });
    }

    return res
      .status(400)
      .json({ access: false, error: 'Не удалось обновить данные' });
  } catch (e) {
    res.status(500).json({ access: false, error: e.message });
  }
};

// signOut
export const signOutController = async (req, res) => {
  try {
    res.set('Set-Cookie', `access_token=''; HttpOnly; Path=/; Max-Age=0`);

    return res.json({
      access: true,
    });
  } catch (e) {
    res.status(500).json({ access: false, error: e.message });
  }
};

// currentUser
export const currentUserController = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res
        .status(400)
        .json({ access: false, error: 'Пользователь не найден' });
    }

    const { passwordHash, ...userRes } = user._doc;

    return res.status(200).json({
      access: true,
      user: userRes,
    });
  } catch (e) {
    res.status(404).json({ access: false, error: e.message });
  }
};
