import { Models } from "appwrite";
type Permissions = {
  read: any[];
  write: any[];
};

export type Files = {
  $id: string;
  id: string;
  file_name: string;
  file_path: string;
  user_id: string;
  $createdAt: Date;
  $collection: string;
  $permissions: Permissions;
  size: string;
};
export type FilesModels = Files & Models.Document;
export type File = Files;

export type FileSubmit = {
  id: string;
  file_name: string;
  file_path: string;
  user_id: string;
};
