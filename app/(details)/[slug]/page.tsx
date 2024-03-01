import { Link } from "@nextui-org/link";
import { title, subtitle } from "@/components/primitives";
import { storage } from "@/core/config/AppwriteConfig";
import { Metadata } from "next";
import settingsService from "@/core/services/settings.service";
import PostesServices from "@/core/services/poste.service";
import { Card } from "@nextui-org/react";
import { ChevronRight, Home } from "lucide-react";
import UserInfosChip from "@/components/modules/users/user-infos";
import Share from "@/components/modules/shares";
import CategoriesListSidebar from "@/components/modules/Sidebar/categorie-list-sidebar";
import { Image } from "@nextui-org/react";
import { disPlayImageForFrontUrl } from "@/core/utils/helpers.utils";
import MakDownContentText from "@/components/modules/Articles/articleTypes/ecrit";
import Videos from "@/components/modules/Articles/articleTypes/videos";
import { EnumPosteType } from "@/core/enum";
import Audios from "@/components/modules/Articles/articleTypes/audios";
import Newsletter from "@/components/modules/Sidebar/newsletter-sidebar";
import FileList from "@/components/modules/Articles/articleTypes/pdf";
import PageViews from "@/components/modules/Pageview";
import SocialMediaShare from "@/components/modules/shares";

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

    const article = await PostesServices.GetPosteBySlug(params.slug);
    if (setting === null)
      return {
        title: "Not Found",
        description: "The page you are looking for does not exist.",
      };

    return {
      title: `Amourdivin -  ${article.documents[0].title} `,
      description: `${article.documents[0].summary}`,
      keywords: `${article.documents[0].keywords},  `,

      openGraph: {
        title: `Amourdivin -  ${article.documents[0].title} `,
        description: `${article.documents[0].summary}`,
        url: `${article.documents[0].title_slug}`,
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
        title: `Amourdivin -  ${article.documents[0].title} `,
        description: `${article.documents[0].summary}`,
        siteId: "1467726470533754880",
        creator: "@nextjs",
        creatorId: "1467726470533754880",
        images: [simple],
      },
    };
  } catch (error) {
    return {
      title: "Page not found",
      description: "is The page is not exist",
    };
  }
}

async function getDetails(slug: string) {
  const articleDetails = await PostesServices.GetPosteBySlug(slug);

  return {
    article: articleDetails.documents[0],
  };
}

export default async function Details({
  params,
}: {
  params: { slug: string };
}) {
  const { article } = await getDetails(params.slug || "");
  return (
    <>
      <PageViews postes={article}>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <div className="gap-4 mx-auto container max-w-5xl ">
            <div className=" h-full w-full flex-col flex  gap-4 ">
              <Card className="flex gap-4 p-3">
                <ul className=" flex gap-2 list-none">
                  <li className=" gap-3 flex items-center justify-center ">
                    <Link
                      href={"/"}
                      className="hover:text-primary-500 transition-colors duration-300 mx-auto"
                    >
                      <Home size={15} className="text-foreground-700" />
                    </Link>
                    {<ChevronRight size={15} />}
                  </li>
                  <li className=" gap-4 flex items-center justify-center">
                    <span className="text-foreground-700 transition-colors duration-300">
                      {article.title}
                    </span>
                  </li>
                </ul>
              </Card>

              <div className=" w-full py-2 grid grid-cols-1 md:grid-cols-12 gap-4 md:justify-between ">
                <Card className="grid md:col-span-8 gap-4 p-3">
                  <div className="flex flex-col gap-4">
                    <div className="gap-4 flex-wrap ">
                      <h3
                        className={title({
                          color: "green",
                          size: "sm",
                          class: "text-large  my-auto  justify-left flex pt-4 ",
                        })}
                      >
                        {article?.title}
                      </h3>
                    </div>
                    <div className="flex w-full py-2 md:flex-row flex-col gap-4 flex-wrap md:justify-between ">
                      <h3
                        className={subtitle({
                          class:
                            "text-justify   text-default-500 text-black/60 dark:text-gray-300",
                        })}
                      >
                        {article?.summary}
                      </h3>
                    </div>
                    <div className="flex w-full py-2  flex-row gap-4 justify-between ">
                      <div className="gap-4">
                        <UserInfosChip type="DETAILS" id={article.user_id} />
                      </div>
                      <div className="">
                        <SocialMediaShare
                          link={`${process.env.NEXT_PUBLIC_WEB_SITE_URL}/${article.title_slug}`}
                          article={article}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col mx-auto gap-4">
                      {article?.post_type === EnumPosteType.ARTICLES && (
                        <div className="flex flex-col mx-auto gap-4">
                          <Image
                            alt="Card background"
                            className="object-cover rounded-xl w-[700px] h-[15rem] md:h-[20rem] "
                            src={disPlayImageForFrontUrl(
                              article?.image_default || ""
                            )}
                          />
                          <span className="mx-auto flex s">
                            {article?.image_description || ""}
                          </span>
                        </div>
                      )}
                    </div>

                    <Videos
                      type={article?.post_type}
                      youtubeUrl={article?.video_url}
                    />

                    {article?.post_type === EnumPosteType.AUDIOS ? (
                      <Audios article={article} />
                    ) : (
                      ""
                    )}

                    <MakDownContentText content={article?.content} />

                    {article?.post_type === EnumPosteType.AUDIOS ||
                    article?.post_type === EnumPosteType.ARTICLES ? (
                      <FileList article={article} />
                    ) : (
                      ""
                    )}
                  </div>
                </Card>
                <div className="grid md:col-span-4 ">
                  <div className="flex flex-col h-fit">
                    <CategoriesListSidebar />
                    <Newsletter />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageViews>
    </>
  );
}
