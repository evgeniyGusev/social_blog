import axios from 'axios';

import { INewPost } from '@/lib/api/posts/interfaces.ts';

function savePost(post: INewPost): Promise<{ data: { success: boolean; post: string } }> {
  return axios.post('/api/posts/new', post);
}

export const PostsApi = {
  savePost,
};
