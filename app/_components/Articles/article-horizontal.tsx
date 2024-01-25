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
import { BellDot } from "lucide-react";
import { IPostsModels } from "@/core/interfaces/posts";

interface IArticleH {
  article: IPostsModels | [];
}
const ArticleHorizontalItem: FC<IArticleH> = ({ article }) => {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Card className="border-none bg-background/60 dark:bg-gray-900/20 w-full  md:max-w-3xl my-3">
      <CardBody className="flex flex-row flex-grow gap-4 h-full ">
        <Image
          alt="Card background"
          isZoomed
          className="object-cover rounded-xl    h-56"
          src="https://plus.unsplash.com/premium_photo-1702249257777-927e3857a56b?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <div className="flex flex-col w-full gap-3">
          <div className="flex justify-between">
            <Chip size="sm">Chip</Chip>
            <div></div>
          </div>
          <Link href="#">
            <p className="line-clamp-2 cursor-pointer  font-bold text-black dark:text-white  ">
              {ClimpText(
                "fdshdfdlkas fhsakljf dhsjkafhdjks hfds kaflhdsfjkldsffdshfdskajfhdksajfhdjksfjkdsafh",
                150
              )}
            </p>
          </Link>
          <p className="line-clamp-3 cursor-pointer text-sm text-default-500 text-black/60 dark:text-gray-300 ">
            {ClimpText(
              "fdshdfdlkas fhsakljf dhsjkafhdjks hfds kaflhdsfjkldsffdshfdskajfhdksajfhdjksfjkdsafh dkhdsfkyas fdhifyhafhdfjkdkjslahfdskfhdsafl dhjf dhsafhdjsfhdksahf safk h",
              200
            )}
          </p>
          <div className="flex justify-between items-start pt-3">
            <div className="flex gap-2 rounded-lg">
              <Avatar
                isBordered
                radius="md"
                size="sm"
                src="https://plus.unsplash.com/premium_photo-1702249257777-927e3857a56b?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-xs cursor-pointer font-semibold leading-none text-default-600">
                  Zoey Lang
                </h4>
                <h5 className="text-xs cursor-pointer tracking-tight text-default-400">
                  @zoeylang
                </h5>
              </div>
            </div>

            <div className="flex gap-2 justify-between ml-4">
              <Button
                variant="light"
                radius="full"
                aria-label="more than 99 notifications"
              >
                <BellDot size={15} />
                1234
              </Button>
              <Button
                radius="full"
                aria-label="more than 99 notifications"
                variant="light"
              >
                <BellDot size={15} />
                1234
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
export default ArticleHorizontalItem;
