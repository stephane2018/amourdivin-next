import { ID, Query } from "appwrite";

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
import { isBot } from "next/dist/server/web/spec-extension/user-agent";
import { isBrowser, isMobile } from "react-device-detect";
import { database } from "../config/AppwriteConfig";
import { getCurrentMonth, getCurrentWeek } from "../utils/helpers.utils";
import moment from "moment";
import GeneriqueService from "./generique.service";

class PostsView {
  private date: Date;

  constructor() {
    this.date = new Date();
  }

  public async saveViewMontData(
    poste: IPostsModels,
    ip: string,
    user_agent: string
  ) {
    try {
      const data = await GeneriqueService.GetLasteElement<IPostPageviewsMonths>(
        "post_pageviews_month",
        [Query.limit(1), Query.orderDesc("$createdAt")]
      );
      if (data !== null) {
        console.log(data);
        const Lat_id = Number(data?.id) + 1;
        const ipAdress = ip;
        const MonthData: SubmitPostPageviewsMonth = {
          id: Lat_id.toString(),
          post_id: poste.id.toString(),
          post_user_id: poste.user_id,
          ip_address: ipAdress,
          user_agent: user_agent,
          reward_amount: "0",
          created_at: this.date,
        };

        await GeneriqueService.Save("post_pageviews_month", MonthData);
      }

      return Promise.resolve(true);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  public async SaveViewWeekData(
    poste: IPostsModels,
    ip: string,
    user_agent: string
  ) {
    try {
      const data = await generiqueService.GetLasteElement<IPostPageviewsWeeks>(
        "post_pageviews_week",
        [Query.limit(1), Query.orderDesc("created_at")]
      );
      if (data !== null) {
        const Lat_id = Number(data?.id) + 1;
        const ipAdress = ip;
        const dataToSave: SubmitPostPageviewWeek = {
          id: Lat_id.toString(),
          post_id: poste.id.toString(),
          post_user_id: poste.user_id,
          ip_address: ipAdress,
          user_agent: user_agent,
          reward_amount: "0",
          created_at: this.date,
        };
        await GeneriqueService.Save("post_pageviews_week", dataToSave);
        return Promise.resolve(true);
      }
      return Promise.resolve(true);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  public async CountViews(ip: string, poste: IPostsModels, userAgent: string) {
    if (ip === undefined) {
      return undefined;
    }
    if (poste !== undefined && !isBot(userAgent)) {
      if (isMobile || isBrowser) {
        // await this.CheckAndSaveViewWeek(ip, poste, userAgent);
        await this.CheckAndSaveViewMonth(ip, poste, userAgent);
      }
    }
  }
  private async CheckAndSaveViewWeek(
    ip: string,
    poste: IPostsModels,
    userAgent: string
  ) {
    GeneriqueService.Match("post_pageviews_week", [
      Query.limit(1),
      Query.equal("ip_address", ip),
      Query.equal("post_id", Number(poste.id)),
      Query.equal("user_agent", userAgent),
      Query.equal("created_at", getCurrentWeek().debut),
      Query.equal("created_at", getCurrentWeek().fin),
    ])
      .then(async (data) => {
        if (data?.total === 0) {
          await this.SaveViewWeekData(poste, ip, userAgent).then(async () => {
            const curentPost = {
              pageviews: poste.pageviews + 1,
            };
            await this.UpdatePageView(poste.$id, curentPost);
          });
        }
      })
      .catch(async () => {
        return null;
      });
  }
  private async CheckAndSaveViewMonth(
    ip: string,
    poste: IPostsModels,
    userAgent: string
  ) {
    GeneriqueService.Match("post_pageviews_month", [
      Query.limit(1),
      Query.equal("ip_address", ip),
      Query.equal("post_id", poste.id.toString()),
      Query.equal("user_agent", userAgent),
      Query.equal("created_at", getCurrentMonth().debut),
      Query.equal("created_at", getCurrentMonth().fin),
    ])
      .then(async (data) => {
        console.log(data);
        if (data?.total === 0) {
          await this.saveViewMontData(poste, ip, userAgent).then(async () => {
            const curentPost = {
              pageviews: poste.pageviews + 1,
            };
            await this.UpdatePageView(poste.$id, curentPost);
          });
        }
      })
      .catch(async () => {
        return null;
      });
  }
  private async UpdatePageView(posteId: string, data: any) {
    return await database.updateDocument(
      "amourdivin",
      "648db34bdfd761afd139",
      posteId,
      data
    );
  }
}
const PostView = new PostsView();
export default PostView;
