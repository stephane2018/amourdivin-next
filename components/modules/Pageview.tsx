import { database } from "@/core/config/AppwriteConfig";
import { IPagesModels } from "@/core/interfaces/Pages";
import { IPostsModels } from "@/core/interfaces/posts";
import generiqueService from "@/core/services/generique.service";
import postViewService from "@/core/services/postView.service";
import getIPAddress from "@/hooks/getIp";
import useUserIP from "@/hooks/getIp";
import { Query } from "appwrite";
import { isBot } from "next/dist/server/web/spec-extension/user-agent";
import { cookies } from "next/headers";
import { FC, useEffect, useState } from "react";
import { isBrowser, isMobile } from "react-device-detect";

async function CountViews(ip: string, poste: IPostsModels) {
  if (ip === undefined) {
    return undefined;
  }
  if (poste !== undefined && !isBot(navigator.userAgent)) {
    if (isMobile || isBrowser) {
      const user_agent = navigator.userAgent;
      console.log(ip);
      generiqueService
        .Match("post_pageviews_week", [
          Query.limit(1),
          Query.equal("ip_address", ip),
          Query.equal("post_id", Number(poste.id)),
          Query.equal("user_agent", user_agent),
        ])
        .then((result) => {
          if (result?.total === 0) {
            const curentPost = {
              pageviews: poste.pageviews + 1,
            };

            database
              .updateDocument(
                "amourdivin",
                "648db34bdfd761afd139",
                poste.$id,
                curentPost
              )
              .then(async (update) => {
                if (update) {
                  await postViewService.SaveViewWeekData(poste, ip);
                  await postViewService.saveViewMontData(poste, ip);
                }
              });
          }
        });
    }
  }
}

interface IPageView {
  children: React.ReactNode;
  postes?: IPostsModels;
}
const PageViews: FC<IPageView> = async ({ children, postes }) => {
  const ipAddres = await getIPAddress();
  //   if (postes) {
  //     CountViews(useUserIP(), postes);
  //   }

  console.log(ipAddres);
  return <div>{children}</div>;
};

export default PageViews;
