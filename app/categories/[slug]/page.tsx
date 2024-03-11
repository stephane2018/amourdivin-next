import { storage } from "@/core/config/AppwriteConfig";
import settingsService from "@/core/services/settings.service";
import { Metadata, ResolvingMetadata } from "next";
import { subtitle, title } from "@/components/primitives";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
} from "@nextui-org/react";
import CategorieServices from "@/core/services/categories.service";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { useRouter } from "next/router";
import LoadMoreCategories from "@/components/modules/categories/categories-list";
import { ICategories } from "@/core/interfaces/categories";
import Sidebar from "@/components/modules/Sidebar/sidebar";
import CategoriesHeader from "@/components/modules/categories/categorie-header";
import LoadMoreArticles from "@/components/modules/Articles/LoadMoreArticles";

type Props = {
  params: { slug: string };
};
// getPagesBySlug
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const setting = await settingsService.get();
    const simple = storage.getFilePreview("logo", "logo-512", 800, 600);
    const img800 = storage.getFilePreview("logo", "logo-512", 800, 600);
    const img1800 = storage.getFilePreview("logo", "logo-512", 1800, 1600);

    const categorie = await CategorieServices.getParentCategorieBySlug(
      params.slug
    );

    if (setting === null)
      return {
        title: "Not Found",
        description: "The page you are looking for does not exist.",
      };

    return {
      title: `Amourdivin - Categories-${categorie?.name} `,
      description: `${categorie?.description}`,
      keywords: `${categorie?.keywords},  `,

      openGraph: {
        title: categorie?.name,
        description: categorie?.description,
        url: `/categories/${categorie?.name_slug}`,
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
        title: `Amourdivin - ${categorie?.name} `,
        description: categorie?.description,
        siteId: "1467726470533754880",
        creator: "@stephane",
        creatorId: "1467726470533754880",
        images: [simple],
      },
    };
  } catch (error) {
    return {
      title: "Page not found",
      description: "The page you are trying to load is not exist",
    };
  }
}

async function getCategorie(slug: string) {
  let subCategorie: ICategories[] | null = null;
  const categorie = await CategorieServices.getParentCategorieBySlug(slug);
  if (categorie !== null) {
    subCategorie = await CategorieServices.getSubCategories(
      categorie?.id || ""
    );
  }

  const subCategoriesIdList: string[] = [];
  if (subCategorie)
    subCategorie?.map((item) => subCategoriesIdList.push(item.id));

  return {
    categorie: categorie,
    subCategoriesIdList: subCategoriesIdList || [],
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { categorie, subCategoriesIdList } = await getCategorie(
    params.slug || ""
  );

  return (
    <section className=" mx-auto container  items-center justify-center gap-4 py-2 md:py-5">
      {/* <div className="gap-4 mx-auto container max-w-5xl mt-4">
        <div className=" h-full w-full flex-col flex  gap-4 ">
          <Card className="flex gap-4 p-3">
            <ul className=" flex gap-2 list-none">
              <li className=" gap-3 flex items-center justify-center ">
                <Link
                  href={"/"}
                  className="hover:text-primary-500 transition-colors duration-300 mx-auto"
                >
                  <Home size={15} />
                </Link>
                {<ChevronRight size={15} />}
              </li>
              <li className=" gap-4 flex items-center justify-center">
                <Link
                  href={`/categories`}
                  className="hover:text-primary-500 transition-colors duration-300"
                >
                  {" "}
                  Categories
                </Link>
                {<ChevronRight size={15} />}
              </li>
              <li className=" gap-4 flex items-center justify-center">
                <span className="text-primary-500 transition-colors duration-300">
                  {categorie?.name}
                </span>
              </li>
            </ul>
          </Card>
          <Card className="flex w-full flex-col p-4 ">
            <div className="flex ml-4">
              <h3
                className={title({
                  color: "green",
                  size: "md",
                  class: " text-left justify-left flex ",
                })}
              >
                {categorie?.name}
              </h3>
            </div>
            <h1
              className={subtitle({
                className: "!text-sm  text-left justify-left ml-4",
              })}
            >
              {categorie?.description}
            </h1>

            <div className="w-full gap-4 p-4">
              <LoadMoreCategories
                slug={categorie?.name_slug}
                subCategoriesIdList={subCategoriesIdList || []}
              />
            </div>
          </Card>
          <div className="gap-">
            <Sidebar />
          </div>
        </div>
      </div> */}
      <div className="gap-4 mx-auto container grid grid-cols-1 md:grid-cols-12 w-full mt-4">
        <div className="col-span-12 flex-col gap-4">
          <Card className="flex w-full flex-col p-4 ">
            <div className="flex mb-5 bg-black/40 p-3 rounded-xl">
              <ul className=" flex gap-2 list-none">
                <li className=" gap-3 flex items-center justify-center ">
                  <Link
                    href={"/"}
                    className="hover:text-primary-500 transition-colors duration-300 mx-auto"
                  >
                    <Home size={15} />
                  </Link>
                  {<ChevronRight size={15} />}
                </li>
                <li className=" gap-4 flex items-center justify-center">
                  <Link
                    href={`/categories`}
                    className="hover:text-primary-500 transition-colors duration-300"
                  >
                    {" "}
                    Categories
                  </Link>
                  {<ChevronRight size={15} />}
                </li>
                <li className=" gap-4 flex items-center justify-center">
                  <span className="text-primary-500 transition-colors duration-300">
                    {categorie?.name}
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex-col  gap-3">
              <div className="flex bg-black/20 p-3 w-full rounded-xl ">
                <h3
                  className={title({
                    color: "green",
                    size: "md",
                    class:
                      " md:text-left text-center md:justify-left justify-center flex-wrapflex ",
                  })}
                >
                  {categorie?.name}
                </h3>
              </div>
              <h1
                className={subtitle({
                  className: "!text-sm  flex-wrap text-left justify-left ml-4",
                })}
              >
                {categorie?.description}
              </h1>
            </div>
          </Card>
          <Card className="flex w-full flex-col p-4  mt-4">
            <LoadMoreCategories
              slug={categorie?.name_slug}
              subCategoriesIdList={subCategoriesIdList || []}
            />
          </Card>
        </div>
        {/* <div className="col-span-7 w-full">
          <div className=" py-4 gap-3">
            <LoadMoreCategories
              slug={categorie?.name_slug}
              subCategoriesIdList={subCategoriesIdList || []}
            />
          </div>
        </div>
        <div className="flex-col col-span-5 w-full ">
          <Sidebar />
        </div> */}
      </div>
    </section>
  );
}
