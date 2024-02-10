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

export default function RootLayout({
  children,
  featured,
}: {
  children: React.ReactNode;
  featured: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
              <Footer />
            </div>
          </SettingsProvider>
        </Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}
