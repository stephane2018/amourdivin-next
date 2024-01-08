import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              50: "#f3faf3",
              100: "#e3f5e5",
              200: "#c7ebcb",
              300: "#9cd9a4",
              400: "#69bf74",
              500: "#419c4d",
              600: "#33863e",
              700: "#2b6a34",
              800: "#26552d",
              900: "#214627",
              950: "#0e2512",
              DEFAULT: "#419c4d",
              foreground: "#000000",
            },
          },
        },
        dark: {
          colors: {
            primary: {
              50: "#f3faf3",
              100: "#e3f5e5",
              200: "#c7ebcb",
              300: "#9cd9a4",
              400: "#69bf74",
              500: "#419c4d",
              600: "#33863e",
              700: "#2b6a34",
              800: "#26552d",
              900: "#214627",
              950: "#0e2512",
            },
          },
        },
      },
    }),
  ],
};
