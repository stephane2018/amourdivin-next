"use client";
import CategoriesHeader from "@/components/modules/categories/categorie-header";
import { ICategories } from "@/core/interfaces/categories";
import { useGetCategoriesParent } from "@/hooks/useCategories";
import { Avatar, Card, CardBody, CardHeader } from "@nextui-org/react";
import { FC } from "react";

const CategorieItem = ({ categorieItem }: { categorieItem: ICategories }) => {
  return (
    <div
      className=" transition-all duration-300 
    bg-foreground-50 hover:bg-foreground-100 shadow-sm 
    justify-between items-center 
     cursor-pointer gap-2 p-1  flex rounded-xl w-full
     "
    >
      <span className="px-2 text-black/60 dark:text-white first-letter:capitalize ">
        {categorieItem.name.toLowerCase() || ""}
      </span>
      <Avatar size="sm" className="rounded-xl" name={`0`} />
    </div>
  );
};

const CategoriesListSidebar = () => {
  const { data, isLoading } = useGetCategoriesParent();
  return (
    <Card className="border-none shadow-small w-full   md:max-w-2xl my-3">
      <CardHeader className="flex flex-row flex-grow gap-4 h-full">
        <CategoriesHeader />
      </CardHeader>
      <CardBody className="flex flex-col flex-grow gap-2 h-full ">
        {data?.documents.map((categorie, key) => (
          <CategorieItem
            key={`${categorie.$id}${categorie.$createdAt}`}
            categorieItem={categorie}
          />
        ))}
      </CardBody>
    </Card>
  );
};

export default CategoriesListSidebar;
