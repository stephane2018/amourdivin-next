export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Acceuil",
      href: "/",
    },
    {
      label: "Contacts",
      href: "/contact",
    },
    {
      label: "Categories",
      href: "/categories",
    },
    {
      label: "A propos de nous",
      href: "/a-propos-de-nous",
    },
    {
      label: "Terme et conditions",
      href: "/terms-conditions",
    },
  ],
  navMenuItems: [
    {
      label: "Acceuil",
      href: "/",
    },
    {
      label: "Contacts",
      href: "/contact",
    },
    {
      label: "Categories",
      href: "/categories",
    },
    {
      label: "A propos de nous",
      href: "/a-propos-de-nous",
    },
    {
      label: "Terme et conditions",
      href: "/terms-conditions",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
