import { Models } from "appwrite";

type Permissions = {
  read: any[];
  write: any[];
};

export type Pages = {
  id: string;
  lang_id: string;
  title: string;
  slug: string;
  description: string;
  keywords: string;
  is_custom: string;
  page_default_name: string;
  page_content: string;
  page_order: string;
  visibility: string;
  title_active: string;
  breadcrumb_active: string;
  right_column_active: string;
  need_auth: string;
  location: string;
  link: string;
  parent_id: string;
  page_type: string;
  created_at: Date;
  $id: string;
  $createdAt: Date;
  $collection: string;
  $permissions: Permissions;
};
export type IPagesModels = Pages & Models.Document;
