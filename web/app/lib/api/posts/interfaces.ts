export interface INewPost {
  title: string;
  body: string;
  poster: string;
}

export interface IPost {
  _id: string;
  title: string;
  body: string;
  poster: string;
  author_name: string;
  likes: string[];
  favs: string[];
  comments: string[];
  createdAt: string;
  updatedAt: string;
}
