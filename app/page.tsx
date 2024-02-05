import { storage } from "@/core/config/AppwriteConfig";
import { Metadata, ResolvingMetadata } from "next";
import settingsService from "@/core/services/settings.service";
import Featured from "./_components/Featured/featured";
import { Avatar } from "@nextui-org/avatar";
import ArticleByThemes from "./_components/Articles/article-by-theme";
import ArticleHorizontalItem from "./_components/Articles/article-horizontal";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  Button,
} from "@nextui-org/react";
import React from "react";
import SidePopularArticle from "./_components/Sidebar/sidebar-popular-article";
import ArticleHorizontalSmallItem from "./_components/Articles/article-horizontal-small";
import { ListTodo } from "lucide-react";
import CategoriesHeader from "@/components/modules/categories/categorie-header";
import Sidebar from "./_components/Sidebar/sidebar";
import LoadMoreArticles from "./_components/Articles/LoadMoreArticles";

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const setting = await settingsService.get();
    const simple = storage.getFilePreview("logo", "logo-512", 800, 600);
    const img800 = storage.getFilePreview("logo", "logo-512", 800, 600);
    const img1800 = storage.getFilePreview("logo", "logo-512", 1800, 1600);

    if (setting === null)
      return {
        title: "Not Found",
        description: "The page you are looking for does not exist.",
      };

    return {
      title: setting.documents[0].site_title,
      description: setting.documents[0].site_description,
      keywords: setting.documents[0].keywords,

      openGraph: {
        title: setting.documents[0].site_title,
        description: setting.documents[0].site_description,
        url: "/",
        siteName: setting.documents[0].application_name,
        images: [
          {
            url: img800.href,
            width: 800,
            height: 600,
          },
          {
            url: img1800.href,
            width: 1800,
            height: 1600,
            alt: "My custom alt",
          },
        ],
        locale: "fr_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: setting.documents[0].site_title,
        description: setting.documents[0].site_description,
        siteId: "1467726470533754880",
        creator: "@nextjs",
        creatorId: "1467726470533754880",
        images: [simple],
      },
    };
  } catch (error) {
    return {
      title: "Page not found",
      description: "The page you are trying to lod is not exist",
    };
  }
}

export default function Page({}: { children: React.ReactNode }) {
  return (
    <section className=" mx-auto container  items-center justify-center gap-4 py-2 md:py-5">
      <Featured />
      <ArticleByThemes />
      <div className="gap-4 mx-auto container grid grid-cols-1 md:grid-cols-12 w-full mt-4">
        <div className="col-span-7 w-full">
          <div className="col-span-12">
            <CategoriesHeader hideIcon={false} title={"Article Recent"} />
          </div>
          <div className=" gap-3">
            <LoadMoreArticles />
          </div>
        </div>
        <div className="flex-col col-span-5 w-full ">
          <Sidebar />
        </div>
      </div>
    </section>
  );
}
