"use client";
import React from "react";
import ArticleHorizontalSmallItem from "../../Articles/article-horizontal-small";
import { useGetPopularPostsForTheCurrentWeek } from "@/hooks/usePostes";
import ArticleSmallSkeletonList from "../../Articles/skeleton/articleSkeletonSmall";
import { Card, CardBody } from "@nextui-org/card";
import { Info } from "lucide-react";

const PopularArticleWeek = ({ isEnable }: { isEnable: boolean }) => {
  const {
    PosteCurrenWeekList,
    isLoadingAll: isLoading,
    isError,
  } = useGetPopularPostsForTheCurrentWeek(isEnable);

  console.log(PosteCurrenWeekList);
  return (
    <div className="max-w-full   dark:bg-gray-900/20 ">
      {isLoading ? <ArticleSmallSkeletonList item={3} /> : null}

      {PosteCurrenWeekList.length === 0 && isLoading === false && (
        <Card className=" w-full h-32 bg-default-100">
          <CardBody className="h-32  text-center justify-center items-center">
            <div className="h-full flex flex-col items-center justify-center mx-auto">
              <Info size={18} className="text-default-500 " />
              <h2 className="text-default-500 text-black/60 dark:text-gray-300">
                Pas d&apos;article cette semaine
              </h2>
            </div>
          </CardBody>
        </Card>
      )}
      {PosteCurrenWeekList.length > 0 &&
        PosteCurrenWeekList.filter((filter) => filter.id !== undefined).map(
          (postes, i) => {
            return postes !== undefined ? (
              <ArticleHorizontalSmallItem
                key={`${postes.$id}-week-${i}`}
                article={postes}
              />
            ) : null;
          }
        )}
    </div>
  );
};
export default PopularArticleWeek;
