import "@/styles/globals.css";
import { Metadata } from "next";
import { fontSans } from "@/core/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import Footer from "@/components/footer";
import { Toaster } from "sonner";
import { SettingsProvider } from "@/core/context/SettingsProvider";

import { Roboto } from "next/font/google";
import settingsService from "@/core/services/settings.service";
import GeneralSettingsService from "@/core/services/general-settings.service";
import { GoogleAnalytics } from "@next/third-parties/google";
import { general_settings } from "../core/interfaces/general_settings";
import SettingServices from "@/core/services/settings.service";
import { storage } from "@/core/config/AppwriteConfig";
import { SpeedInsights } from "@vercel/speed-insights/next";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_WEB_SITE_URL}`),
  alternates: {
    canonical: "/",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "google",
    yandex: "yandex",
    other: {
      me: ["bitebstephane1996@gmail"],
    },
  },
};

async function getDetails() {
  const Generalsettings = await GeneralSettingsService.getSettings(1);
  const setting = await settingsService.get();
  const simple = await storage.getFilePreview("logo", "logo-512");
  return {
    logo: simple,
    setting: setting?.documents[0] || null,
    googleAnalytics: Generalsettings?.documents[0],
  };
}
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { googleAnalytics, logo, setting } = await getDetails();

  return (
    <html lang="fr" suppressHydrationWarning className={roboto.className}>
      <head />
      <body
        className={clsx(
          "min-h-screen font-sans antialiased  dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2]",
          fontSans.variable
        )}
      >
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,green)]"></div>

        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <SettingsProvider>
            <div className="relative flex  flex-col h-screen">
              <Navbar />
              <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                {children}
              </main>
              <Footer logo={logo} setting={setting} />
            </div>
          </SettingsProvider>
        </Providers>
        <Toaster richColors />
        {googleAnalytics?.google_analytics && (
          <GoogleAnalytics gaId={googleAnalytics?.google_analytics} />
        )}
        <SpeedInsights />
      </body>
    </html>
  );
}
