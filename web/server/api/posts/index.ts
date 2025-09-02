// import PostModel from '../../models/Posts';
// import { getUsersById } from '../../utils/get_users';
// import { ApiError } from '../../utils/api_errors';
//
// export const addNewPostController = async (req, res) => {
//   try {
//     const { currentUser: author } = await getUsersById({
//       currentId: req.userId,
//     });
//
//     if (!author) {
//       return ApiError.userNotFound(res);
//     }
//
//     const { title, body, poster } = req.body;
//
//     const newPost = new PostModel({
//       author: author._id,
//       title,
//       body,
//       poster,
//     });
//
//     const post = await newPost.save();
//
//     return res.status(200).json({
//       success: true,
//       post: post._id,
//     });
//   } catch (e) {
//     ApiError.commonServerError(res);
//   }
// };
//
// export const getUserPostsController = async (req, res) => {
//   try {
//     const { user } = await getUsersById({ id: req.userId });
//
//     let posts = await PostModel.find({ author: user._id });
//
//     if (!user) {
//       return ApiError.userNotFound(res);
//     }
//
//     if (posts.length) {
//       posts = posts.map(({ _doc: { author, __v, ...post } }) => ({
//         ...post,
//         author_name: user.name,
//       }));
//     }
//
//     return res.status(200).json({
//       success: true,
//       posts,
//     });
//   } catch (e) {
//     ApiError.commonServerError(res);
//   }
// };
//
// export const getPostsByUserIdController = async (req, res) => {
//   try {
//     const { user } = await getUsersById({ id: req.query.user_id });
//
//     if (!user) {
//       return ApiError.userNotFound(res);
//     }
//
//     let posts = await PostModel.find({ author: user._id });
//
//     if (posts.length) {
//       posts = posts.map(({ _doc: { author, __v, ...post } }) => ({
//         ...post,
//         author_name: user.name,
//       }));
//     }
//
//     return res.status(200).json({
//       success: true,
//       posts,
//     });
//   } catch (e) {
//     ApiError.commonServerError(res);
//   }
// };
//
// export const getPostsByIdController = async (req, res) => {
//   try {
//     const post = await PostModel.findById(req.params.id);
//
//     if (!post) {
//       return res.status(404).json({ access: false, error: 'Пост не найдена' });
//     }
//
//     return res.status(200).json({
//       success: true,
//       post,
//     });
//   } catch (e) {
//     ApiError.commonServerError(res);
//   }
// };
