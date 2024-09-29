import CommunityModel from '../models/Community.js';
import { ApiError } from '../helpers/api_errors.js';

export async function createNewCommunity(req, res) {
  try {
    const communityUnit = new CommunityModel(req.body);

    await communityUnit.save();

    return res.status(200).json(communityUnit);
  } catch (e) {
    ApiError.commonServerError(e, res);
  }
}

export const getCommunitiesController = async (req, res) => {
  try {
    const communities = await CommunityModel.find();

    if (!communities) {
      ApiError.notFound(res);
    }

    return res.status(200).json({
      data: communities._doc,
    });
  } catch (e) {
    ApiError.commonServerError(res);
  }
};

export const getCommunityByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const community = id ? await CommunityModel.findById(id) : null;

    if (!community) {
      ApiError.userNotFound(res);
    }

    return res.status(200).json({
      data: community._doc,
    });
  } catch (e) {
    ApiError.commonServerError(res);
  }
};
