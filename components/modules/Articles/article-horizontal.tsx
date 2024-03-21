import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
} from "@nextui-org/react";
import React, { FC } from "react";
import { Avatar, Badge, Button, Chip, Image, Link } from "@nextui-org/react";
import {
  ClimpText,
  disPlayImageForFrontUrl,
  getTypeOfArticiles,
} from "@/core/utils/helpers.utils";
import { IPostsModels } from "@/core/interfaces/posts";
import CategorieChip from "../categories/categories-type";
import moment from "moment";
import "moment/locale/fr";
import IconHandler from "@/components/modules/ImagesAndIcones/IconeHandler";
import UserInfosChip from "../users/user-infos";
import ArticleComment from "../comments/article-comments";
moment.locale("fr");
interface IArticleH {
  article: IPostsModels | undefined;
  isVertical?: boolean;
  isInCategoriePage?: boolean;
}
const ArticleHorizontalItem: FC<IArticleH> = ({
  article,
  isVertical = false,
  isInCategoriePage = false,
}) => {
  return (
    <Card
      className={`hover:shadow-large  transition-transform ease-in-out  duration-300  w-full   md:max-w-2xl ${
        isVertical ? "my-4" : "my-2"
      }`}
    >
      <CardBody
        className={`grid ${
          isVertical ? "grid-cols-1" : "grid-cols-5"
        }  gap-3 h-full `}
      >
        <div
          className={`gap-2 ${
            isVertical ? "col-span-1" : "col-span-2 "
          } w-full relative`}
        >
          <Link href={`/${article?.title_slug}`}>
            <Image
              alt="Card background"
              width={isVertical ? 500 : 250}
              className="object-cover rounded-xl   h-[8rem] md:h-[10rem]"
              src={disPlayImageForFrontUrl(
                article?.image_default || "",
                false,
                `&preview?width=${
                  isVertical ? 500 : 250
                }&height=128&quality=50&output=webp`
              )}
            />
          </Link>

          {article?.post_type && (
            <Button
              isIconOnly
              className=" h-10  z-10 top-[40%] left-[40%] absolute items-center flex justify-items-center rounded-full bg-foreground-100/40"
            >
              <IconHandler
                type={getTypeOfArticiles(article?.post_type || "")}
                className="text-white shadow-xl items-center mx-auto"
              />
            </Button>
          )}
        </div>
        <div
          className={`${
            isVertical ? "col-span-1" : "col-span-3"
          } flex-col w-full gap-3 mr-3`}
        >
          <div className="flex justify-between">
            {article?.category_id && (
              <CategorieChip
                id={article?.category_id}
                isCategoriesPage={isInCategoriePage}
              />
            )}
            <div className="item-center justify-center gap-3 ">
              <h4 className="text-[0.60rem] md:text-xs cursor-pointer font-semibold leading-none text-default-600">
                {moment(article?.created_at.toString()).fromNow(true)}(
                {moment(article?.created_at.toString()).format("DD-MM-YYYY")})
              </h4>
            </div>
          </div>
          <Link href={`/${article?.title_slug}`} className="mb-4 w-full">
            <p className="line-clamp-2 text-sm cursor-pointer font-bold text-black dark:text-white  ">
              {ClimpText(article?.title || "", 180)}
            </p>
          </Link>
          <p className="line-clamp-2  cursor-pointer text-[0.60rem] md:text-sm text-default-500 text-black/60 dark:text-gray-300 ">
            {ClimpText(article?.summary || "", 180)}
          </p>
          <div className="flex justify-between items-start pt-3">
            {article?.category_id && (
              <UserInfosChip id={article?.user_id || ""} />
            )}

            <div className="flex gap-2 justify-between ml-4">
              <ArticleComment
                view={article?.pageviews || 0}
                id={article?.user_id || ""}
              />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
export default ArticleHorizontalItem;
