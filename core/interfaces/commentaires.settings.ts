import { Models } from "appwrite";

type Permissions = {
  read: any[];
  write: any[];
};

export type ICommentaire = {
  id: string;
  parent_id: string;
  post_id: string;
  user_id: string;
  name: string;
  comment: string;
  ip_address: string;
  like_count: string;
  status: string;
  created_at: Date;
  email: string;
  $id: string;
  $createdAt: Date;
  $updatedAt: Date;
  $permissions: Permissions;
  $collectionId: string;
  $databaseId: string;
};
export type ICommentaires = ICommentaire & Models.Document;

export type PosteCommentaire = {
  created_at: Date;
  email: string;
  id: string;
  name: string;
  comment: string;
  like_count: string;
  parent_id: string;
  post_id: string;
  user_id: string;
  ip_address: any;
  status: string;
};
