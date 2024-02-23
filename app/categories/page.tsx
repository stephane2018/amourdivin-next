import { storage } from "@/core/config/AppwriteConfig";
import settingsService from "@/core/services/settings.service";
import { Metadata, ResolvingMetadata } from "next";
import { subtitle, title } from "@/components/primitives";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import CategorieServices from "@/core/services/categories.service";
import { ICategories } from "@/core/interfaces/categories";
import Link from "next/link";

// getPagesBySlug
export async function generateMetadata(): Promise<Metadata> {
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
      title: "Amourdivin - Categories",
      description: "Listes des categories ",
      keywords: `${setting.documents[0].keywords},  `,

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
        title: "Amourdivin - categories",
        description: "Listes des categories",
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

async function getCateogies() {
  const categories = await CategorieServices.getCategoriesParents();
  return {
    categories: categories.documents,
  };
}

const CategoriesItem = ({ data }: { data: ICategories }) => {
  return (
    <Card
      as={Link}
      href={`categories/${data.name_slug}`}
      isBlurred
      className="h-20 dark:bg-black/70 dark:hover:bg-primary-600/30 hover:bg-primary-600/30 hover:cursor-pointer "
    >
      <CardBody className=" items-center justify-center gap-4">
        <h4 className={`flex-wrap font-medium text-small `}>{data.name}</h4>
      </CardBody>
    </Card>
  );
};

export default async function Page() {
  const categories = await getCateogies();
  return (
    <section className=" mx-auto container  items-center justify-center gap-4 py-2 md:py-5">
      <div className="gap-4 mx-auto container max-w-5xl mt-4">
        <Card className=" h-full w-full ">
          <div className="flex w-full flex-col p-4">
            <div className="flex ">
              <h3
                className={title({
                  color: "green",
                  size: "md",
                  class: " text-left justify-left flex ",
                })}
              >
                Categories
              </h3>
              <span className="bg-green-500/30 text- px-3 h-fit rounded-xl">
                8 articles
              </span>
            </div>

            <h1
              className={subtitle({
                className: "!text-sm  text-left justify-left",
              })}
            >
              Voici la liste des categories disponible
            </h1>
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {categories.categories
              .filter((categorie) => {
                return (
                  categorie.name !== "direct" && categorie.name !== "general"
                );
              })
              .map((categories, key) => (
                <CategoriesItem data={categories} key={key} />
              ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
