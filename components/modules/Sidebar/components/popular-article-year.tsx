"use client";
import React from "react";
import ArticleHorizontalSmallItem from "../../Articles/article-horizontal-small";
import {
  useGetPopularPostsForTheCurrentMonths,
  useGetPopularPostsForTheCurrentWeek,
  useGetPopularPostyear,
} from "@/hooks/usePostes";
import ArticleSmallSkeletonList from "../../Articles/skeleton/articleSkeletonSmall";
import { Card, CardBody } from "@nextui-org/card";
import { Info } from "lucide-react";
import { IPostsModels } from "@/core/interfaces/posts";

const PopularArticleYear = ({ isEnable }: { isEnable: boolean }) => {
  // const {
  //   PosteCurrenyearList,
  //   isLoadingAll: isLoading,
  //   isError,
  // } = useGetPopularPostsForTheCurrentyear(isEnable);
  const { data, isLoading } = useGetPopularPostyear();

  return (
    <div className="max-w-full   dark:bg-gray-900/20 ">
      {isLoading ? <ArticleSmallSkeletonList item={3} /> : null}

      {data?.documents.length === 0 && isLoading === false && (
        <Card className=" w-full h-32 bg-default-100">
          <CardBody className="h-32  text-center justify-center items-center">
            <div className="h-full flex flex-col items-center justify-center mx-auto">
              <Info size={18} className="text-default-500 " />
              <h2 className="text-default-500 text-black/60 dark:text-gray-300">
                Pas d&apos;article ce mois
              </h2>
            </div>
          </CardBody>
        </Card>
      )}
      {(data?.documents || [])
        .filter((filter) => filter.id !== undefined)
        .map((postes, i) => {
          return postes !== undefined ? (
            <ArticleHorizontalSmallItem
              key={`${postes.$id}-week-${i}`}
              article={postes as IPostsModels}
            />
          ) : null;
        })}
    </div>
  );
};
export default PopularArticleYear;
