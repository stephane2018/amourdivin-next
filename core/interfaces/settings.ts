import { Models } from "appwrite";

type Permissions = {
  read: any[];
  write: any[];
};

export interface Settings {
  id: number;
  lang_id: number;
  site_title: string;
  home_title: string;
  site_description: string;
  keywords: string;
  application_name: string;
  primary_font: string;
  secondary_font: string;
  tertiary_font: string;
  facebook_url: string;
  twitter_url: string;
  instagram_url: string;
  telegram_url: string;
  youtube_url: string;
  optional_url_button_name: string;
  about_footer: string;
  contact_text: string;
  contact_address: string;
  contact_email: string;
  contact_phone: string;
  copyright: string;
  cookies_warning: string;
  cookies_warning_text: string;
  $createdAt: Date;
  $updatedAt: Date;
  $permissions: Permissions;
  $collectionId: string;
  $databaseId: string;
}

export type SettingsModels = Settings & Models.Document;
