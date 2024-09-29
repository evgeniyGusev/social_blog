import ChildrenModel from '../models/Children.js';

export async function getChildById(id) {
  const user = id ? await ChildrenModel.findById(id) : null;

  return user;
}
