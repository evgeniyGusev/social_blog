import ChildrenModel from '../models/Children.js';
import { getChildById } from '../helpers/children.js';
import { ApiError } from '../helpers/api_errors.js';

export async function createNewChild(req, res) {
  try {
    const childUnit = new ChildrenModel(req.body);

    await childUnit.save();

    return res.status(200).json(childUnit);
  } catch (e) {
    ApiError.commonServerError(e, res);
  }
}

export const getChildByIdController = async (req, res) => {
  try {
    const child = await getChildById({ id: req.params.id });

    if (!child) {
      ApiError.notFound(res);
    }

    return res.status(200).json({
      data: child._doc,
    });
  } catch (e) {
    ApiError.commonServerError(res);
  }
};
