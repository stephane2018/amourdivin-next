import { Models } from "appwrite";
type Permissions = {
  read: any[];
  write: any[];
};
export interface PostPageviewsWeeks {
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
export type IPostPageviewsWeeks = PostPageviewsWeeks & Models.Document;

export interface SubmitPostPageviewWeek {
  id: string;
  post_id: string;
  post_user_id: string;
  ip_address: string;
  user_agent: string;
  reward_amount: "0";
  created_at: Date;
}
