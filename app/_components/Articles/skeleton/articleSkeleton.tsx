import { Card, CardBody, Skeleton } from "@nextui-org/react";
import React, { FC } from "react";

const SkeletonArticle = () => {
  return (
    <Card className="  hover:shadow-large  transition-transform ease-in-out  duration-300  w-full   md:max-w-2xl my-2">
      <CardBody className="flex flex-row flex-grow gap-4 h-full ">
        <Skeleton className="rounded-xl w-[50%] h-[11rem]  bg-default-300" />
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
}
const ArticleSkeletonList: FC<IArticleSkeletonList> = ({ item = 5 }) => {
  return (
    <div className="grid grid-cols-1 gap-2">
      {Array.from({ length: item }, (_, index) => index + 1).map((index) => (
        <SkeletonArticle key={index} />
      ))}
    </div>
  );
};
export default ArticleSkeletonList;
