export type CommentType = {
  title: string;
  id: string;
  createdAt: string;
  comment: string;
  user: {
    name: string;
    image: string;
  };
  Comment?: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
  }[];
};
