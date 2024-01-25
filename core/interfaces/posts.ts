import * as Yup from "yup";
import { EnumPosteType } from "../enum";
import { Models } from "appwrite";

type Permissions = {
  read: any[];
  write: any[];
};

export const PosteSchema = Yup.object({
  status: Yup.string().default(""),
  user_id: Yup.string().notRequired(),
  created_at: Yup.date().notRequired(),
  lang_id: Yup.string().required("requis"),
  title: Yup.string().required("requis"),
  title_hash: Yup.string().default("").optional(),
  title_slug: Yup.string().default("").optional(),
  keywords: Yup.string().required("requis"),
  summary: Yup.string().required("requis"),
  category_id: Yup.string().required("requis"),
  sub_category_id: Yup.string().required("requis"),
  image_default: Yup.string().default(null).notRequired(),
  optional_url: Yup.string().default(null).optional(),
  post_type: Yup.string().default(null).notRequired(),
  need_auth: Yup.number().default(0).notRequired(),
  is_in_vedette: Yup.string().default("0").optional(),
  vedette_order: Yup.number().default(0).notRequired(),
  is_slider: Yup.number().default(0).notRequired(),
  slider_order: Yup.number().default(0).notRequired(),
  is_featured: Yup.number().default(0).notRequired(),
  featured_order: Yup.number().default(0).required(),
  is_recommended: Yup.number().default(0).notRequired(),
  is_breaking: Yup.number().default(0).notRequired(),
  is_scheduled: Yup.number().default(0).notRequired(),
  date_publish: Yup.string().when("is_scheduled", {
    is: true,
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.default(null).nullable(),
  }),
  visibility: Yup.number().default(0).required(),
  show_right_column: Yup.string().required("requis"),
  video_path: Yup.string()
    .default(null)
    .when("post_type", {
      is: "videos",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.nullable(),
    }),
  image_url: Yup.string().default(null).notRequired(),
  video_url: Yup.string()
    .default(null)
    .when("post_type", {
      is: "videos",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.nullable(),
    }),
  video_embed_code: Yup.string()
    .default(null)
    .when("post_type", {
      is: "videos",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.nullable(),
    }),
  show_post_url: Yup.number().default(0).notRequired(),
  image_description: Yup.string()
    .default(null)
    .when("image_default", {
      is: "images" || "videos" || "articles",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.default(null).nullable(),
    }),
  show_item_numbers: Yup.string().default("0").notRequired(),
  content: Yup.string().required("requis"),
  tags: Yup.array().required("requis"),
  // post_url: Yup.string().default(null),
  send_post_to_subscribes: Yup.string().default("0").notRequired(),
  image_big: Yup.string().default(null).nullable(),
  image_slider: Yup.string().default(null).nullable(),
  image_mid: Yup.string().default(null).nullable(),
  image_small: Yup.string().default(null).nullable(),
  image_mime: Yup.string().default(null).nullable(),
  // file_id: Yup.string().default(null).nullable(),
  // file_name: Yup.string().default(null).nullable(),
  // file_path: Yup.string().default(null).nullable(),
});

export type PostFormType = Yup.InferType<typeof PosteSchema>;

export const UpdatePosteSchema = Yup.object({
  status: Yup.number().default(1),
  user_id: Yup.string().notRequired(),
  created_at: Yup.date().notRequired(),
  lang_id: Yup.string().required("requis"),
  title: Yup.string().required("requis"),
  title_hash: Yup.string().default("").optional(),
  title_slug: Yup.string().default("").optional(),
  keywords: Yup.string().required("requis"),
  summary: Yup.string().required("requis"),
  category_id: Yup.string().required("requis"),
  sub_category_id: Yup.string().required("requis"),
  image_default: Yup.string().default(null).notRequired(),
  optional_url: Yup.string().default(null).optional().notRequired(),
  post_type: Yup.string().default(null).notRequired(),
  need_auth: Yup.number().default(0).notRequired(),
  is_in_vedette: Yup.string().default("0").optional(),
  vedette_order: Yup.number().default(0).notRequired(),
  is_slider: Yup.number().default(0).notRequired(),
  slider_order: Yup.number().default(0).notRequired(),
  is_featured: Yup.number().default(0).notRequired(),
  featured_order: Yup.number().default(0).required(),
  is_recommended: Yup.number().default(0).notRequired(),
  is_breaking: Yup.number().default(0).notRequired(),
  is_scheduled: Yup.number().default(0).notRequired(),
  date_publish: Yup.string().when("is_scheduled", {
    is: true,
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.default(null).nullable(),
  }),
  visibility: Yup.number().required(),
  show_right_column: Yup.string().required("requis"),
  video_path: Yup.string()
    .default(null)
    .when("post_type", {
      is: "videos",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.nullable(),
    }),
  image_url: Yup.string().default(null).notRequired(),
  video_url: Yup.string()
    .default(null)
    .when("post_type", {
      is: "videos",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.nullable(),
    }),
  video_embed_code: Yup.string()
    .default(null)
    .when("post_type", {
      is: "videos",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.nullable(),
    }),
  show_post_url: Yup.number().default(0).notRequired(),
  image_description: Yup.string()
    .default(null)
    .when("image_default", {
      is: "images" || "videos" || "articles",
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.default(null).nullable(),
    }),
  show_item_numbers: Yup.string().default("0").notRequired(),
  content: Yup.string().required("requis"),
  tags: Yup.array().required("requis"),
  post_url: Yup.string().default("0").notRequired(),
  send_post_to_subscribes: Yup.string().default("0").notRequired(),
  image_big: Yup.string().default(null).nullable(),
  image_slider: Yup.string().default(null).nullable(),
  image_mid: Yup.string().default(null).nullable(),
  image_small: Yup.string().default(null).nullable(),
  image_mime: Yup.string().default(null).nullable(),
  // file_id: Yup.string().default(null).nullable(),
  // file_name: Yup.string().default(null).nullable(),
  // file_path: Yup.string().default(null).nullable(),
});

export type UpdatePosteSchema = Yup.InferType<typeof PosteSchema>;

export type Postes = {
  lang_id: number;
  groupe_only: number;
  title: string;
  title_hash: string | null;
  title_slug: string | null;
  keywords: string;
  summary: string;
  category_id: string;
  image_big: string | null;
  image_default: string | undefined;
  image_slider: string | null;
  image_mid: string | null;
  image_small: string | null;
  image_mime: string | null;
  optional_url: string;
  pageviews: number;
  post_type:
    | EnumPosteType.ARTICLES
    | EnumPosteType.AUDIOS
    | EnumPosteType.VIDEOS;
  need_auth: number;
  is_in_vedette: string | null;
  vedette_order: number;
  is_slider: number;
  slider_order: number;
  is_featured: number;
  featured_order: number;
  is_recommended: number;
  is_breaking: number;
  visibility: number;
  show_right_column: string;
  video_path: string | null;
  image_url: string;
  video_url: string;
  video_embed_code: string;
  user_id: string;
  status: string;
  feed_id: string;
  show_post_url: number;
  show_item_numbers: string;
  updated_at: string;
  created_at: string;
  post_url: string;
  content: string;
  is_scheduled: number;
  image_description: string;
  date_publish: string;
  id: number;
  $id: string;
  $createdAt: Date;
  $updatedAt: string;
  $permissions: Permissions;
  $collectionId: string;
  $databaseId: string;
};

export type SendPostes = {
  lang_id: string;
  groupe_only: string;
  title: string;
  title_hash: string | null;
  title_slug: string | null;
  keywords: string;
  summary: string;
  status: string;
  category_id: string;
  image_big: string | null;
  image_default: string | null;
  image_slider: string | null;
  image_mid: string | null;
  image_small: string | null;
  image_mime: string | null;
  optional_url: string | null;
  pageviews: number;
  post_type: string | null;
  need_auth: number;
  is_in_vedette: string | null;
  vedette_order: number;
  is_slider: number;
  slider_order: number;
  is_featured: number;
  featured_order: number;
  is_recommended: number;
  is_breaking: number;
  visibility: number;
  show_right_column: string;
  video_path: string | null;
  image_url: string;
  video_url: string;
  video_embed_code: string;
  user_id: string;
  feed_id: string;
  show_post_url: number;
  show_item_numbers: string;
  updated_at: string;
  created_at: string;
  // post_url: string;
  content: string;
  is_scheduled: number;
  image_description: string;
  id: number;
};

export type UpdateData = Omit<
  SendPostes,
  | "created_at"
  | "id"
  | "updated_at"
  | "$createdAt"
  | "$updatedAt"
  | "$permissions"
  | "$collectionId"
  | "$databaseId"
>;

export type IPostsModels = Postes & Models.Document;
