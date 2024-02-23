"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { FC } from "react";
import ArticleHorizontalSmallItem from "../Articles/article-horizontal-small";
import CategoriesHeader from "@/components/modules/categories/categorie-header";
import { useGetRecomendedPosts } from "@/hooks/usePostes";
import {
  disPlayImageForFrontUrl,
  disPlayImageUrl,
  getTypeOfArticiles,
} from "@/core/utils/helpers.utils";
import moment from "moment";
import IconHandler from "../ImagesAndIcones/IconeHandler";
import { IPostsModels } from "@/core/interfaces/posts";

const RecommandationFirstItem = ({ postes }: { postes: IPostsModels }) => {
  return (
    postes !== undefined && (
      <Card
        isFooterBlurred
        className="w-full shadow-none border-none h-[300px] col-span-12 sm:col-span-7 mt-3 relative "
      >
        <CardHeader className="absolute z-10  bg-gradient-to-b from-black/90 to-white/2 flex-col !items-start">
          <p className="text-tiny text-white uppercase font-bold">
            {moment(postes[0]?.created_at.toString()).format("DD/MM/YYYY")}{" "}
          </p>
          <h4 className="text-white font-medium ">{postes[0]?.title}</h4>
        </CardHeader>
        <Image
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover"
          src={disPlayImageUrl(postes[0]?.image_default || "")}
        />
        {postes[0]?.post_type && (
          <Button
            isIconOnly
            className=" h-10  z-10 top-[40%] left-[40%] absolute items-center flex justify-items-center rounded-full bg-foreground-100/40"
          >
            <IconHandler
              type={getTypeOfArticiles(postes[0]?.post_type || "")}
              className="text-white shadow-xl items-center mx-auto"
            />
          </Button>
        )}
      </Card>
    )
  );
};

export default function Recommandation() {
  const { data } = useGetRecomendedPosts();
  const postes = data?.documents
    .reverse()
    .sort(
      (a, b) =>
        Date.parse(b.created_at.toString()) -
        Date.parse(a.created_at.toString())
    )
    .filter((c) => c.visibility === 1);
  return (
    postes && (
      <Card className="flex flex-col shadow-small border-none  w-full  md:max-w-2xl my-3 ">
        <CardHeader className="flex flex-col ">
          <CategoriesHeader title="Recommadation" hideIcon={false} />
          {/* @ts-expect-error Server Component */}
          <RecommandationFirstItem postes={postes[0]} />
        </CardHeader>
        <CardBody className="flex flex-col pt-3  ">
          <ArticleHorizontalSmallItem article={postes[1]} />
          <ArticleHorizontalSmallItem article={postes[2]} />
          <ArticleHorizontalSmallItem article={postes[3]} />
        </CardBody>
      </Card>
    )
  );
}
