import { FC } from "react";
import CategoriesListSidebar from "./categorie-list-sidebar";
import SidePopularArticle from "./sidebar-popular-article";
import Recommandation from "./recommendations-sidebar";
import Newsletter from "./newsletter-sidebar";
import DownloadSidebar from "./download-sidebar";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = async () => {
  return (
    <div className="flex flex-col gap-3 md:mt-10">
      <CategoriesListSidebar />
      <SidePopularArticle />
      <DownloadSidebar />
      <Newsletter />
      <Recommandation />
    </div>
  );
};

export default Sidebar;
