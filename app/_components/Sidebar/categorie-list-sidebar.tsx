import CategoriesHeader from "@/components/modules/categories/categorie-header";
import { Avatar, Card, CardBody, CardHeader } from "@nextui-org/react";
import { FC } from "react";

const CategorieItem = ({
  title,
  articlesLenght,
}: {
  title: string;
  articlesLenght: string;
}) => {
  return (
    <div className=" transition-all duration-300 bg-foreground-100 shadow-sm justify-between items-center  cursor-pointer gap-2 p-1  flex rounded-xl w-full">
      <span className="px-2">{title || ""}</span>
      <Avatar
        size="sm"
        className="rounded-xl  bg-foreground-300  font-medium"
        name={`${articlesLenght || 0}`}
      />
    </div>
  );
};

const CategoriesListSidebar = () => {
  return (
    <Card className="border-none shadow-small w-full   md:max-w-2xl my-3">
      <CardHeader className="flex flex-row flex-grow gap-4 h-full">
        <CategoriesHeader />
      </CardHeader>
      <CardBody className="flex flex-col flex-grow gap-2 h-full ">
        <CategorieItem articlesLenght="0" title=" Armourdivin" />
      </CardBody>
    </Card>
  );
};

export default CategoriesListSidebar;
