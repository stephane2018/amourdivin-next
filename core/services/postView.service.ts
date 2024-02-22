import { Query } from "appwrite";

import generiqueService from "./generique.service";
import { IPostsModels } from "../interfaces/posts";
import {
  IPostPageviewsMonths,
  SubmitPostPageviewsMonth,
} from "../interfaces/PostPageviewsMonth";
import {
  IPostPageviewsWeeks,
  SubmitPostPageviewWeek,
} from "../interfaces/PostPageViewsWeek";

class PostsView {
  private user_agent: string;

  private date: Date;

  constructor() {
    this.user_agent = navigator.userAgent;
    this.date = new Date();
  }

  public async saveViewMontData(poste: IPostsModels, ip: string) {
    try {
      const data = await generiqueService.GetLasteElement<IPostPageviewsMonths>(
        "post_pageviews_month",
        [Query.limit(1), Query.orderDesc("created_at")]
      );
      if (data === null) return 0;
      const Lat_id = Number(data?.id) + 1;
      const ipAdress = ip;
      const MonthData: SubmitPostPageviewsMonth = {
        id: Lat_id.toString(),
        post_id: poste.id.toString(),
        post_user_id: poste.user_id,
        ip_address: ipAdress,
        user_agent: this.user_agent,
        reward_amount: "0",
        created_at: this.date,
      };
      await generiqueService.Save("post_pageviews_month", poste.$id, MonthData);
      return Promise.resolve(true);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  public async SaveViewWeekData(poste: IPostsModels, ip: string) {
    try {
      const data = await generiqueService.GetLasteElement<IPostPageviewsWeeks>(
        "post_pageviews_week",
        [Query.limit(1), Query.orderDesc("created_at")]
      );
      if (data !== null) {
        const Lat_id = Number(data?.id) + 1;
        const ipAdress = ip;
        const MonthData: SubmitPostPageviewWeek = {
          id: Lat_id.toString(),
          post_id: poste.id.toString(),
          post_user_id: poste.user_id,
          ip_address: ipAdress,
          user_agent: this.user_agent,
          reward_amount: "0",
          created_at: this.date,
        };
        await generiqueService.Save(
          "post_pageviews_week",
          poste.$id,
          MonthData
        );
        return Promise.resolve(true);
      }
      return Promise.resolve(true);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }
}
export default new PostsView();
