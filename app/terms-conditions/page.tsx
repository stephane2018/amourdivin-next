import { storage } from "@/core/config/AppwriteConfig";
import settingsService from "@/core/services/settings.service";
import { Card, Code } from "@nextui-org/react";
import { Metadata, ResolvingMetadata } from "next";
import { subtitle, title } from "@/components/primitives";
import ContactForm from "@/components/modules/contacts/contactsForm";
import { Pages } from "../../core/interfaces/Pages";
import pagesService from "@/core/services/pages.service";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote/rsc";
// getPagesBySlug
export async function generateMetadata(): Promise<Metadata> {
  try {
    const setting = await settingsService.get();
    const simple = storage.getFilePreview("logo", "logo-512", 800, 600);
    const img800 = storage.getFilePreview("logo", "logo-512", 800, 600);
    const img1800 = storage.getFilePreview("logo", "logo-512", 1800, 1600);

    const page = await pagesService.getPagesBySlug("terms-conditions");

    if (setting === null)
      return {
        title: "Not Found",
        description: "The page you are looking for does not exist.",
      };

    return {
      title: `Amourdivin - ${page.documents[0].title} `,
      description: `${page.documents[0].description}`,
      keywords: `${page.documents[0].keywords}`,

      openGraph: {
        title: page.documents[0].title,
        description: page.documents[0].description,
        url: `/${page.documents[0].slug}`,
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
            alt: "amourdivin",
          },
        ],
        locale: "fr_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `Amourdivin - ${page.documents[0].title} `,
        description: `${page.documents[0].description}`,
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

async function getPageDetails() {
  const AproposDeNous = await pagesService.getPagesBySlug("terms-conditions");
  return {
    AproposDeNous: AproposDeNous.documents[0],
  };
}
export default async function Page() {
  const page = await getPageDetails();

  return (
    <section className=" mx-auto container  items-center justify-center gap-4 py-2 md:py-5">
      <div className="gap-4 mx-auto container max-w-5xl mt-4">
        <Card className=" h-full w-full">
          <div className="flex w-full flex-col p-4">
            <h3
              className={title({
                color: "green",
                size: "sm",
                class: " mx-auto text-left justify-center",
              })}
            >
              Termes and condition &nbsp;
            </h3>
            <br />

            <div className="w-full gap-5">
              {page.AproposDeNous && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: page.AproposDeNous.page_content,
                  }}
                />
              )}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
