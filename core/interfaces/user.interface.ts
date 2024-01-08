import type { Models } from "appwrite";

type Permissions = {
  read: any[];
  write: any[];
};

export interface IUsers {
  username: string;
  slug: string;
  token: string;
  password: string;
  google_id?: any;
  facebook_id?: any;
  vk_id?: any;
  role: string;
  user_type: string;
  status: number;
  last_seen: string;
  total_pageviews: string;
  facebook_url?: any;
  twitter_url?: any;
  instagram_url?: any;
  pinterest_url?: any;
  linkedin_url?: any;
  id: string;
  email_status: string;
  vk_url?: any;
  telegram_url?: any;
  youtube_url?: any;
  show_email_on_profile: string;
  show_rss_feeds: string;
  site_color: string;
  reward_system_enabled: string;
  balance: string;
  created_at: string;
  site_mode: string;
  avatar: string;
  email: string;
  about_me: string;
  $id: string;
  $collection: string;
  $permissions: Permissions;
}
export type IUserModels = IUsers & Models.Document;

export interface IRegisterUserInfos {
  username: string;
  slug: string;
  token: string;
  password: string;
  google_id?: any;
  facebook_id?: any;
  vk_id?: any;
  role: string;
  user_type: string;
  status: number;
  last_seen: string;
  total_pageviews: string;
  facebook_url?: any;
  twitter_url?: any;
  instagram_url?: any;
  pinterest_url?: any;
  linkedin_url?: any;
  id: string;
  email_status: string;
  vk_url?: any;
  telegram_url?: any;
  youtube_url?: any;
  show_email_on_profile: string;
  show_rss_feeds: string;
  site_color: string;
  reward_system_enabled: string;
  balance: string;
  created_at: string;
  site_mode: string;
  avatar: string;
  email: string;
  about_me: string;
}

export type ILogin = {
  email: string;
  password: string;
};

export interface IRegister {
  email: string;
  password: string;
  username: string;
}
