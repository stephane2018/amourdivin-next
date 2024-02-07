import { Models } from "appwrite";
type Permissions = {
  read: any[];
  write: any[];
};
export interface PostPageviewsMonths {
  id: string;
  post_id: number;
  post_user_id: number;
  ip_address: string;
  user_agent: string;
  reward_amount: string;
  $createdAt: Date;
  $collection: string;
  $permissions: Permissions;
  size: string;
}
export type IPostPageviewsMonths = PostPageviewsMonths & Models.Document;

export interface SubmitPostPageviewsMonth {
  id: string;
  post_id: string;
  post_user_id: string;
  ip_address: string;
  user_agent: string;
  reward_amount: "0";
  created_at: Date;
}
