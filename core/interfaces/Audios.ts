import { Models } from "appwrite";
type Permissions = {
  read: any[];
  write: any[];
};

export type Audios = {
  $id: string;
  id: string;
  download_button: string;
  audio_name: string;
  audio_path: string;
  user_id: string;
  $createdAt: Date;
  $collection: string;
  $permissions: Permissions;
};

export type AudiosModels = Audios & Models.Document;
export type Audio = Audios;

export type AudiosSubmit = {
  id: string;
  download_button: string;
  audio_name: string;
  audio_path: string;
  user_id: string;
};
