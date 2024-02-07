import { Card, CardBody } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";
import React, { FC } from "react";

const SmallArticleSkeleton = () => {
  return (
    <Card className=" hover:shadow-large  transition-transform ease-in-out  duration-300 max-w-3xl my-1">
      <CardBody className="grid grid-cols-3 gap-2 w-full">
        <Skeleton className="rounded-xl h-[5rem] md:h-[6rem]  bg-default-300" />
        <div className="flex flex-col gap-1 col-span-2 w-full ">
          <Skeleton className="rounded-xl w-[100%] h-2 bg-default-300" />
          <Skeleton className="rounded-xl w-[100%] h-2 bg-default-300" />
          <div className="flex  text-xs justify-between pt-1 ">
            <div className="flex gap-1">
              <Skeleton className="rounded-xl w-[100%] h-2 bg-default-300" />
              <Skeleton className="rounded-xl w-[100%] h-2 bg-default-300" />
            </div>
            <div>
              <Skeleton className="h-1 w-3/5 rounded-lg bg-default-300" />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

interface IArticleSmallSkeletonList {
  item?: number;
}
const ArticleSmallSkeletonList: FC<IArticleSmallSkeletonList> = ({
  item = 5,
}) => {
  return (
    <div className="grid grid-cols-1 gap-1">
      {Array.from({ length: item }, (_, index) => index + 1).map((index) => (
        <SmallArticleSkeleton key={index} />
      ))}
    </div>
  );
};

export default ArticleSmallSkeletonList;
