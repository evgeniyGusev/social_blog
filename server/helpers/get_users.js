import UserModel from '../models/User.js';

export async function getUsersById({ currentId, id }) {
  const currentUser = currentId ? await UserModel.findById(currentId) : null;
  const user = id ? await UserModel.findById(id) : null;

  return { currentUser, user };
}
