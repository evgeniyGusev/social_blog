import axios from 'axios';

import { INewPost, IPost } from '@/lib/api/posts/interfaces.ts';

function savePost(post: INewPost): Promise<{ data: { success: boolean; post: string } }> {
  return axios.post('/api/posts/new', post);
}

function getUserPosts(): Promise<{ data: { success: boolean; posts: IPost[] | [] } }> {
  return axios.get(`/api/posts/user_posts`);
}

export const PostsApi = {
  savePost,
  getUserPosts,
};
