import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  Image,
  Button,
  Link,
} from "@nextui-org/react";
import FeaturedLoading from "./featured-loading";
import posteService from "@/core/services/poste.service";
import {
  disPlayImageUrl,
  getTypeOfArticiles,
} from "@/core/utils/helpers.utils";
import FeatureUserInfos from "./feature-user-infos";
import moment from "moment";
import IconHandler from "@/components/modules/ImagesAndIcones/IconeHandler";

async function getPostes() {
  let isLoading = true;
  const res = await posteService
    .GetFeatured()
    .then((result) => {
      isLoading = false;
      return result?.documents;
    })
    .catch(() => {
      isLoading = false;
      throw new Error("Failed to fetch data");
    });

  return {
    data: res,
    isLoading: isLoading,
  };
}

export default async function Featured() {
  const { data, isLoading } = await getPostes();

  if (isLoading === true) return <FeaturedLoading isLoaded={isLoading} />;
  if (data === undefined) return null;

  return (
    <div className="max-w-full  gap-2 grid grid-cols-12 grid-rows-2 px-2">
      <Card className="col-span-12 sm:col-span-6 h-[300px]">
        <CardHeader className="absolute z-10  bg-gradient-to-b from-black/90 to-white/2 flex-col !items-start">
          <p className="text-tiny text-white uppercase font-bold">
            {moment(data[0]?.created_at.toString()).format("DD/MM/YYYY")}{" "}
          </p>
          <Link
            href={`${data[1].title_slug}`}
            className="text-white font-medium "
          >
            {data[0].title}
          </Link>
        </CardHeader>
        <Link
          href={`${data[0].title_slug}`}
          className="cursor-pointer  w-full h-full"
        >
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src={disPlayImageUrl(data[0].image_default || "")}
          />
        </Link>

        <IconHandler
          type={getTypeOfArticiles(data[0].post_type)}
          className="h-11 w-11 absolute text-white shadow-xl z-10 top-[43%] left-[43%]"
        />

        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          {/* @ts-expect-error Server Component */}
          <FeatureUserInfos poste={data[0]} />
        </CardFooter>
      </Card>
      <Card className="col-span-12 sm:col-span-6 h-[300px]">
        <CardHeader className="absolute z-10 bg-gradient-to-b from-black/90 to-white/2  flex-col !items-start">
          <p className="text-tiny text-white/60 uppercase font-bold ">
            {moment(data[1]?.created_at.toString()).format("DD/MM/YYYY")}
          </p>
          <Link
            href={`${data[1].title_slug}`}
            className="text-white font-medium "
          >
            {" "}
            {data[1].title}
          </Link>
        </CardHeader>
        <Link
          href={`${data[1].title_slug}`}
          className="cursor-pointer  w-full h-full"
        >
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src={disPlayImageUrl(data[1].image_default || "")}
          />
        </Link>
        <IconHandler
          type={getTypeOfArticiles(data[1].post_type)}
          className=" h-12 w-12 absolute text-white shadow-xl z-10 top-[45%] left-[43%] "
        />
      </Card>

      <Card
        isFooterBlurred
        className="w-full h-[300px] col-span-12 sm:col-span-5"
      >
        <CardHeader className="absolute z-10 bg-gradient-to-b from-black/90 to-white/2 flex-col items-start">
          <p className="text-tiny text-white/60    uppercase font-bold">
            {moment(data[2]?.created_at.toString()).format("DD/MM/YYYY")}
          </p>
          <Link
            href={`${data[3].title_slug}`}
            className="text-white font-medium "
          >
            {" "}
            {data[1].title}
          </Link>
        </CardHeader>
        <Link
          href={`${data[1].title_slug}`}
          className="cursor-pointer  w-full h-full"
        >
          <Image
            removeWrapper
            alt="Card example background"
            className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
            src={disPlayImageUrl(data[2].image_default || "")}
          />
        </Link>
        <IconHandler
          type={getTypeOfArticiles(data[2].post_type)}
          className=" h-12 w-12 absolute text-white shadow-xl z-10 top-[45%] left-[43%] "
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          {/* @ts-expect-error Server Component */}
          <FeatureUserInfos poste={data[3]} />
        </CardFooter>
      </Card>
      <Card
        isFooterBlurred
        className="w-full h-[300px] col-span-12 sm:col-span-7"
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            {moment(data[3]?.created_at.toString()).format("DD/MM/YYYY")}
          </p>

          <Link
            href={`${data[3].title_slug}`}
            className="text-white font-medium "
          >
            {data[3].title}
          </Link>
        </CardHeader>
        <Link
          href={`${data[3].title_slug}`}
          className="cursor-pointer  w-full h-full"
        >
          <Image
            removeWrapper
            alt="Relaxing app background"
            className="z-0 w-full h-full object-cover"
            src={disPlayImageUrl(data[3].image_default || "")}
          />
        </Link>
        <IconHandler
          type={getTypeOfArticiles(data[3].post_type)}
          className=" h-12 w-12 absolute text-white shadow-xl z-10 top-[45%] left-[43%] "
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          {/* @ts-expect-error Server Component */}
          <FeatureUserInfos poste={data[3]} />
        </CardFooter>
      </Card>
    </div>
  );
}
