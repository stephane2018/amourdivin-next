import { FC } from "react";
import CategoriesListSidebar from "./categorie-list-sidebar";
import SidePopularArticle from "./sidebar-popular-article";
import Recommandation from "./recommendations-sidebar";
import Newsletter from "./newsletter-sidebar";
import DownloadSidebar from "./download-sidebar";

export default function Sidebar() {
  return (
    <div className="flex flex-col w-full gap-3 md:mt-10">
      <SidePopularArticle />
      {/* @ts-expect-error Server Component */}
      <Recommandation />
      <CategoriesListSidebar />
      <Newsletter />
    </div>
  );
}
