import ChildrenModel from '../models/Children.js';
import { getChildById } from '../helpers/children.js';
import { ApiError } from '../helpers/api_errors.js';

export async function createNewChild(childInfo) {
  const childUnit = await ChildrenModel.create(childInfo);

  await childUnit.save();
}

export const getChildByIdController = async (req, res) => {
  try {
    const child = await getChildById({ id: req.params.id });

    if (!child) {
      ApiError.userNotFound(res);
    }

    return res.status(200).json({
      data: child._doc,
    });
  } catch (e) {
    ApiError.commonServerError(res);
  }
};
