import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
} from "@nextui-org/react";
import React, { FC } from "react";
import { Avatar, Badge, Button, Chip, Image, Link } from "@nextui-org/react";
import { ClimpText } from "@/core/utils/helpers.utils";
import { BellDot, CalendarDays } from "lucide-react";
import { IPostsModels } from "@/core/interfaces/posts";

interface IArticleH {
  article: IPostsModels | [];
}
const ArticleHorizontalSmallItem: FC<IArticleH> = ({ article }) => {
  // You can add any UI inside Loading, includ  ing a Skeleton.
  return (
    <Card className="border-0 shadow-none text-sm h-fit max-w-3xl my-1">
      <CardBody className="grid grid-cols-3 gap-2 w-full">
        <Image
          alt="Card background"
          isZoomed
          className="object-cover rounded-xl h-[5,7rem] w-full "
          src="https://plus.unsplash.com/premium_photo-1702249257777-927e3857a56b?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <div className="flex flex-col gap-1 col-span-2 w-full ">
          <Chip size="sm">Chip</Chip>
          <Link href="#">
            <p className="line-clamp-2 cursor-pointer  text-xs text-default-500  dark:text-gray-300  ">
              {ClimpText(
                "fdshdfdlkas fhsakljf dhsjkafhdjks hfds kaflhdsfjkldsffdshfdskajfhdksajfhdjksfjkdsafh dhfdsjfsddsajdsadj fdsfsdijfhsaifkshfjdskf",
                100
              )}
            </p>
          </Link>
          <div className="flex  text-xs justify-between pt-1 text-default-500">
            <div className="flex gap-1">
              <CalendarDays size={12} />
              <span>29 May 2022 </span>
            </div>
            <div>fdsnfdsf</div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
export default ArticleHorizontalSmallItem;
