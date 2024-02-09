import { Models } from "appwrite";

type Permissions = {
  read: any[];
  write: any[];
};

export type IContacts = {
  id: string;
  email: string;
  name: string;
  message: string;
  created_at: Date;
  $id: string;
  $createdAt: Date;
  $collection: string;
  $permissions: Permissions;
};
export type IContactsModels = IContacts & Models.Document;
