import PostModel from '../models/Post.js';
import { getUsersById } from '../helpers/get_users.js';
import { ApiError } from '../helpers/api_errors.js';

export const addNewPostController = async (req, res) => {
  try {
    const { currentUser: author } = await getUsersById({
      currentId: req.userId,
    });

    if (!author) {
      return ApiError.userNotFound(res);
    }

    const { title, body, poster } = req.body;

    const newPost = new PostModel({
      author: author._id,
      title,
      body,
      poster,
    });

    const post = await newPost.save();

    return res.status(200).json({
      success: true,
      post: post._id,
    });
  } catch (e) {
    ApiError.commonServerError(res);
  }
};
