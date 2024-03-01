"use client";
import { IPostsModels } from "@/core/interfaces/posts";
import postViewService from "@/core/services/postView.service";
import getIPAddress from "@/hooks/getIp";
import { FC, useEffect, useState } from "react";

interface IPageView {
  children: React.ReactNode;
  postes?: IPostsModels;
}
// eslint-disable-next-line @next/next/no-async-client-component
const PageViews: FC<IPageView> = ({ children, postes }) => {
  const [navigatorUserAgent, setNavigator] = useState("");

  async function CountView(postes: IPostsModels, navigatorUserAgent: string) {
    const ipAddress = await getIPAddress();
    if ((ipAddress as string) && ipAddress !== "" && postes) {
      postViewService.CountViews(
        ipAddress as string,
        postes,
        navigatorUserAgent
      );
    }
  }

  useEffect(() => {
    const userAgentData = navigator.userAgent;

    if (userAgentData && postes !== undefined) {
      CountView(postes, userAgentData);
    }
  }, [postes, navigatorUserAgent]);

  return <div>{children}</div>;
};

export default PageViews;
