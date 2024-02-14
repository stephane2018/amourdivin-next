import { Models } from "appwrite";
type Permissions = {
  read: any[];
  write: any[];
};

export type PosteAudios = {
  $id: string;
  id: string;
  post_id: string;
  audio_id: string;
  $createdAt: Date;
  $collection: string;
  $permissions: Permissions;
};

export type PosteAudiosModels = PosteAudios & Models.Document;
export type PosteAudio = PosteAudios;

export type PosteAudiosSubmit = {
  id: string;
  post_id: string;
  audio_id: string;
};
