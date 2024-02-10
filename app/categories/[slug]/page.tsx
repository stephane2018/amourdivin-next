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
      description: "The page you are trying to lod is not exist",
    };
  }
}

async function getCategorie(slug: string) {
  const categorie = await CategorieServices.getParentCategorieBySlug(slug);
  return {
    categorie: categorie,
  };
}

// const CategoriesItem = ({ data }: { data: ICategories }) => {
//   return (
//     <Card
//       as={Link}
//       href={`categories/${data.name_slug}`}
//       isBlurred
//       className="h-20 dark:bg-black/70 hover:bg-primary-600/30  hover:text-primary-500 transition-colors duration-300 hover:cursor-pointer "
//     >
//       <CardBody className=" items-center justify-center gap-4">
//         <h4 className={`flex-wrap font-medium text-small `}>{data.name}</h4>
//       </CardBody>
//     </Card>
//   );
// };

export default async function Page({ params }: { params: { slug: string } }) {
  const categories = await getCategorie(params.slug || "");
  console.log(categories);
  return (
    <section className=" mx-auto container  items-center justify-center gap-4 py-2 md:py-5">
      <div className="gap-4 mx-auto container max-w-5xl mt-4">
        <div className=" h-full w-full flex-col flex  gap-4 ">
          <Card className="flex gap-4 p-3">
            <ul className=" flex gap-2 list-none">
              <li className="hover:text-primary-500 transition-colors duration-300 hover:underline">
                <Link href={"/"}>Acceuil</Link>
              </li>
              <li className="hover:text-primary-500 transition-colors duration-300 hover:underline">
                <Link href={`/categories`}>Categories</Link>
              </li>
              <li className="hover:text-primary-500 transition-colors duration-300 hover:underline">
                <Link href={`/categories/${categories.categorie?.name_slug}`}>
                  {categories.categorie?.name}
                </Link>
              </li>
            </ul>
          </Card>
          <Card className="flex w-full flex-col p-4">
            <div className="flex f-">
              <h3
                className={title({
                  color: "green",
                  size: "md",
                  class: " text-left justify-left flex ",
                })}
              >
                {categories.categorie?.name}
              </h3>
              <span className="bg-green-400 text-xs px-3 h-fit rounded-xl">
                8 articles
              </span>
            </div>
            <h1
              className={subtitle({
                className: "!text-sm  text-left justify-left",
              })}
            >
              {categories.categorie?.description}
            </h1>
          </Card>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4"></div>
        </div>
      </div>
    </section>
  );
}
