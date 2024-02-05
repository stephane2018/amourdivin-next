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

const RecommandationFirstItem = () => {
  return (
    <Card
      isFooterBlurred
      className="w-full shadow-none border-none h-[300px] col-span-12 sm:col-span-7 mt-3"
    >
      <Image
        removeWrapper
        alt="Relaxing app background"
        className="z-0 w-full h-full object-cover"
        src="/images/card-example-5.jpeg"
      />
      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <div className="flex flex-grow gap-2 items-center">
          <div className="flex flex-col">
            <p className="text-tiny text-white/60">Breathing App</p>
            <p className="text-tiny text-white/60">Get a good night sleep.</p>
          </div>
        </div>
        <Button radius="full" size="sm">
          Get App
        </Button>
      </CardFooter>
    </Card>
  );
};
interface RecommandationProps {}

const Recommandation: FC<RecommandationProps> = () => {
  return (
    <Card className="flex flex-col shadow-small border-none  w-full  md:max-w-2xl my-3 ">
      <CardHeader className="flex flex-col ">
        <CategoriesHeader title="Recommadation" hideIcon={false} />
        <RecommandationFirstItem />
      </CardHeader>
      <CardBody className="flex flex-col pt-3  ">
        <ArticleHorizontalSmallItem article={[]} />
        <ArticleHorizontalSmallItem article={[]} />
        <ArticleHorizontalSmallItem article={[]} />
      </CardBody>
    </Card>
  );
};

export default Recommandation;
