import { Models } from "appwrite";

type Permissions = {
  read: any[];
  write: any[];
};

export type Subscribes = {
  id: string;
  email: string;
  token: string;
  created_at: Date;
  $id: string;
  $createdAt: Date;
  $collection: string;
  $permissions: Permissions;
};

export type ISubscribesModels = Subscribes & Models.Document;
export type Subscribe = Subscribes;
