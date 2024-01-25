import { Models } from "appwrite";

type Permissions = {
  read: any[];
  write: any[];
};

export type ICategorie = {
  name: string;
  name_slug: string;
  parent_id: string;
  keywords: string;
  color?: any;
  id: string;
  block_type?: any;
  category_order?: any;
  show_at_homepage: string;
  show_on_menu: number;
  description: string;
  created_at: string;
  $id: string;
  $collection: string;
  $permissions: Permissions;
};
export type ICategories = ICategorie & Models.Document;
