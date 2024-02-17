"use client";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
} from "@nextui-org/react";
import React, { FC } from "react";
import { Avatar, Badge, Button, Chip, Image, Link } from "@nextui-org/react";
import { ClimpText, disPlayImageForFrontUrl } from "@/core/utils/helpers.utils";
import { BellDot, CalendarDays } from "lucide-react";
import { IPostsModels } from "@/core/interfaces/posts";
import CategorieChip from "../categories/categories-type";
import moment from "moment";

interface IArticleH {
  article: IPostsModels;
}
const ArticleHorizontalSmallItem: FC<IArticleH> = ({ article }) => {
  // You can add any UI inside Loading, includ  ing a Skeleton.

  return (
    <Card className="border-0 shadow-none text-sm h-fit max-w-3xl my-1">
      <CardBody className="grid grid-cols-3 gap-2 w-full">
        <Link href={`/${article?.title_slug}`}>
          <Image
            alt="Card background"
            isZoomed
            width={100}
            className="object-cover rounded-xl h-[5rem] md:h-[6rem]"
            src={disPlayImageForFrontUrl(article?.image_default || "")}
          />
        </Link>
        <div className="flex flex-col gap-1 col-span-2 w-full ">
          <Link href={`/${article?.title_slug}`}>
            <p className="line-clamp-2 cursor-pointer  text-sm font-bold text-black dark:text-white  ">
              {ClimpText(article?.title || "", 100)}
            </p>
          </Link>
          <Link href="#">
            <p className="line-clamp-2 cursor-pointer  text-xs text-default-500  dark:text-gray-300  ">
              {ClimpText(article?.summary || "", 100)}
            </p>
          </Link>
          <div className="flex  text-xs justify-between pt-1 text-default-500">
            <div className="flex gap-1">
              <CalendarDays size={12} />
              <span>{moment(article?.created_at).format("DD-MMM-YYYY")} </span>
            </div>
            <div>{article.pageviews || 0}</div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
export default ArticleHorizontalSmallItem;
