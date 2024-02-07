import CategoriesHeader from "@/components/modules/categories/categorie-header";
import { subtitle, title } from "@/components/primitives";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Input,
  Snippet,
} from "@nextui-org/react";
import { Code, Download } from "lucide-react";
import { FC } from "react";

const PlayStoreButton = () => {
  return (
    <div className=" mx-2 flex w-auto  cursor-pointer items-center rounded-lg bg-black px-2 ">
      <Image
        src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
        className="w-7"
        alt="img"
      />
      <div className="ml-3 cursor-pointer text-left">
        <p className="text-xs font-bold text-gray-200">Telecharger sur </p>
        <p className="text-xs font-bold text-gray-200 "> Google Play Store </p>
      </div>
    </div>
  );
};

const AppStoreButton = () => {
  return (
    <div className=" mx-2 flex w-auto   cursor-pointer  rounded-lg bg-black px-4 py-2">
      <img
        src="https://cdn-icons-png.flaticon.com/512/888/888841.png"
        className="w-7"
        alt="img"
      />
      <div className="ml-3 cursor-pointer  text-left">
        <p className="text-xs font-bold text-gray-200">Telecharger sur </p>
        <p className="text-xs text-gray-200 "> Apple Store </p>
      </div>
    </div>
  );
};

const DownloadSidebar = () => {
  return (
    <Card className="border-none shadow-small  w-full  my-3 flex flex-col ">
      <CardHeader>
        <CategoriesHeader title="Download " icon={<Download size={14} />} />
      </CardHeader>
      <CardBody className="felx flex-col gap-3">
        <div className="flex flex-col w-full gap-4 mx-auto my-4">
          <div className="flex  gap-4">
            <PlayStoreButton />
            <AppStoreButton />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default DownloadSidebar;
