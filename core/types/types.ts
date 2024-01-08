// type de media gerer
export enum TypeOfMedia {
  Audio = "audio",
  Video = "video",
  Ecrit = "article",
  Musics = "musics",
  Other = "other",
}

export enum collectionTypes {
  categories = "categories",
  posts = "posts",
}

export enum QueryKeys {
  LatestPostes = "LatestPostes",
  getOneCategorie = "getOneCategorie",
  getCategories = "getCategories",
}

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX | string;
export type Direction = "vertical" | "horizontal" | "reverse";
export type RecapchaSize = "invisible" | "normal" | "compact";
export type RecapchaPosition = "bottomright" | "bottomleft" | "inline";
export type RecapchaTheme = "light" | "dark";
export type Menu = {
  Title: string;
  link: string;
  label: string;
  icon: string;
  Children: Menu[];
};

export interface IModalState<T = undefined> {
  data?: T;
  state: boolean;
  title: string;
}

export type ResponseApi<T> = {
  data: T;
};

export type IpAddress = `${number}.${number}.${number}.${number}`;
