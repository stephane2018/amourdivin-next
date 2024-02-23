import { Card, CardBody, Skeleton } from "@nextui-org/react";
import React, { FC } from "react";
interface SkeletonArticleInterface {
  isvertical: boolean;
}
const SkeletonArticle: FC<SkeletonArticleInterface> = ({
  isvertical = false,
}) => {
  return (
    <Card className="  hover:shadow-large  transition-transform ease-in-out  duration-300  w-full   md:max-w-2xl my-1">
      <CardBody
        className={`flex ${
          isvertical === true ? "flex-col" : "flex-row flex-grow"
        }  gap-4 h-full `}
      >
        <Skeleton
          className={`rounded-xl ${
            isvertical ? "w-full" : "w-[50%]"
          } h-[11rem]  bg-default-300`}
        />
        <div className="flex flex-col w-full gap-3">
          <div className="flex justify-between">
            <Skeleton className="rounded-xl w-10 h-3"></Skeleton>
          </div>

          <div className="flex flex-col gap-3 my-2">
            <Skeleton className="rounded-xl w-[100%] h-2 bg-default-300" />
            <Skeleton className="rounded-xl w-[100%] h-2 bg-default-300" />
          </div>
          <div className="flex flex-col gap-3 my-2">
            <Skeleton className="rounded-xl w-[100%] h-2 bg-default-300" />
            <Skeleton className="rounded-xl w-[100%] h-2 bg-default-300" />
          </div>
          <div className="flex justify-between items-start pt-3">
            <div className="flex gap-2 rounded-lg">
              <Skeleton className="flex rounded-md w-8 h-8" />
              <div className="flex flex-col  items-start justify-center">
                <Skeleton className="h-1 w-3/5 rounded-lg" />
                <Skeleton className="h-1 w-4/5 rounded-lg" />
              </div>
            </div>

            <div className="flex gap-2 justify-between ">
              <Skeleton className="rounded-xl w-[100%] h-2 bg-default-300" />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

interface IArticleSkeletonList {
  item?: number;
  isvertical?: boolean;
}
const ArticleSkeletonList: FC<IArticleSkeletonList> = ({
  item = 5,
  isvertical = false,
}) => {
  return (
    <div
      className={`${
        !isvertical
          ? "grid grid-cols-1 gap-2"
          : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
      } gap-4 my-1`}
    >
      {Array.from({ length: item }, (_, index) => index + 1).map((index) => (
        <SkeletonArticle isvertical={isvertical} key={index} />
      ))}
    </div>
  );
};
export default ArticleSkeletonList;
