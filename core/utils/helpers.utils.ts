import { Server } from "../config/AppwriteConfig";
import { TypeOfMedia } from "../enum";
import dynamic from "next/dynamic";

export const Percent = (trackProgress: number, duration: number) => {
  const per = duration ? `${(trackProgress / duration) * 100}%` : "0%";
  return per;
};

export const getUrl = (url: string) => {
  const base_url_img = "https://amourdivin.net/";
  let imgUrl = "";
  if (url?.includes(base_url_img)) {
    return url;
  }
  if (url?.includes("uploads/")) {
    imgUrl = base_url_img + url;
  } else if (url?.includes("https://graph.facebook.com")) {
    imgUrl = url;
  } else {
    imgUrl = url;
  }
  return imgUrl;
};

export const StorageUrlBuilder = (imageId: string, bucketId = "images") => {
  return `${Server.endpoint}/storage/buckets/${bucketId}/files/${imageId}/view?project=${Server.project}&mode=admin`;
};

export const disPlayImageForFrontUrl = (url: string, getImgId = false) => {
  const CleanUrl =
    getImgId === true && url?.includes("/v1/storage/buckets/")
      ? url.split("/", 7).at(6)
      : url?.includes("/v1/storage/buckets/") && getImgId === false
      ? `${Server.endpoint}/storage/buckets/images/files/${url
          .split("/", 10)
          .at(8)}/view?project=${Server.project}`
      : getUrl(url);

  return CleanUrl || "";
};

export const StorageUrlAudiosBuilder = (
  imageId: string,
  bucketId = "audios"
) => {
  return `${Server.endpoint}/storage/buckets/${bucketId}/files/${imageId}/view?project=${Server.project}&mode=admin`;
};
/**
 * disPlayImageUrl
 * @param url
 * @returns
 */
export const disPlayImageUrl = (url: string) => {
  return !url?.includes("uploads/")
    ? StorageUrlBuilder(url, "images")
    : getUrl(url);
};

export const disPlayAudiosUrl = (url: string) => {
  return !url?.includes("uploads/")
    ? StorageUrlBuilder(url, "audios")
    : getUrl(url);
};
export const disPlayFileUrl = (url: string) => {
  return !url?.includes("uploads/")
    ? StorageUrlBuilder(url, "pdf")
    : getUrl(url);
};
/**
 *  afficher le type d'icones en function des types d'articles
 * @param types
 * @returns
 */
export const getTypeOfArticiles = (types: string): TypeOfMedia => {
  let type: TypeOfMedia = TypeOfMedia.Audio;
  if (types === TypeOfMedia.Audio) {
    type = TypeOfMedia.Audio;
  } else if (types === TypeOfMedia.Video) {
    type = TypeOfMedia.Video;
  } else if (types === TypeOfMedia.Ecrit) {
    type = TypeOfMedia.Ecrit;
  } else if (types === TypeOfMedia.Musics) {
    type = TypeOfMedia.Musics;
  } else {
    type = TypeOfMedia.Other;
  }
  return type;
};

export function ClimpText(itemText: string, maxLengthOfLink = 120) {
  // maximum no. of characters you want your text to have
  const itemTextArray = itemText.split(" "); // splitting the string into an array
  let reducedFlag = -1; // using a flag to identify if we have acquired the correct length and then to add the ellipsis
  return itemTextArray.reduce((accumulator, currentVal) => {
    if (accumulator.length + currentVal.length > maxLengthOfLink) {
      reducedFlag += 1;
      return reducedFlag ? accumulator : `${accumulator}...`;
    }
    return `${accumulator} ${currentVal}`;
  });
  // you can read more about the reduce function on mozilla.org
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString).toLocaleDateString("fr", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return date;
};

export function formatDateTime(date: string) {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join("-");
}

export function getCurrentWeek() {
  const today = new Date();
  const firstDay = getFirstDayOfWeek(today.toString());

  const lastDay = new Date(firstDay);
  lastDay.setDate(lastDay.getDate() + 6);

  return {
    debut: formatDateTime(firstDay.toString()),
    fin: formatDateTime(lastDay.toString()),
  };
}
function getFirstDayOfWeek(d: string) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
}

export function getCurrentMonth() {
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  return {
    debut: formatDateTime(firstDay.toString()),
    fin: formatDateTime(lastDay.toString()),
  };
}
export function getCurrentYear() {
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), 0, 1);
  const lastDay = new Date(date.getFullYear(), 11, 31);

  return {
    debut: formatDateTime(firstDay.toString()),
    fin: formatDateTime(lastDay.toString()),
  };
}
