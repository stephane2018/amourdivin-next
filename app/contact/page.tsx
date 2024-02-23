import { storage } from "@/core/config/AppwriteConfig";
import settingsService from "@/core/services/settings.service";
import { Card, Code } from "@nextui-org/react";
import { Metadata, ResolvingMetadata } from "next";
import { subtitle, title } from "@/components/primitives";
import ContactForm from "@/components/modules/contacts/contactsForm";
import pagesService from "@/core/services/pages.service";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const setting = await settingsService.get();
    const simple = storage.getFilePreview("logo", "logo-512", 800, 600);
    const img800 = storage.getFilePreview("logo", "logo-512", 800, 600);
    const img1800 = storage.getFilePreview("logo", "logo-512", 1800, 1600);

    const page = await pagesService.getPagesBySlug("contact");

    if (setting === null || page === null)
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

export default function Page() {
  return (
    <section className=" mx-auto container  items-center justify-center gap-4 py-2 md:py-5">
      <div className="gap-4 mx-auto container max-w-xl mt-4">
        <Card className=" h-full w-full">
          <div className="flex w-full flex-col p-4">
            <h1
              className={title({
                color: "green",
                class: " text-left justify-left",
              })}
            >
              Contacts &nbsp;
            </h1>
            <br />
            <h1
              className={subtitle({
                className: "!text-sm  text-left justify-left",
              })}
            >
              Si vous avez un soucis ecrivez nous a travers ce formulaire ou
              appelez un de ces numéros
            </h1>
            <div className="flex gap-3">
              <Code className="bg-black/60  rounded-xl px-2">
                +237694160832
              </Code>
              <Code className="bg-black/60  rounded-xl px-2">
                +237677198908
              </Code>
              <Code className="bg-black/60 rounded-xl px-2">+237693960767</Code>
            </div>

            <div className="w-full">
              <ContactForm />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
