import { Server } from "../config/AppwriteConfig";
import { TypeOfMedia } from "../enum";

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
