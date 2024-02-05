import CategoriesHeader from "@/components/modules/categories/categorie-header";
import { subtitle, title } from "@/components/primitives";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Snippet,
} from "@nextui-org/react";
import { Code } from "lucide-react";
import { FC } from "react";

interface NewsletterProps {}

const Newsletter: FC<NewsletterProps> = () => {
  return (
    <Card className="border-none  shadow-small  w-full  md:max-w-2xl my-3 flex flex-col ">
      <CardHeader>
        <CategoriesHeader title="Newsletter" hideIcon={false} />
      </CardHeader>
      <CardBody className="felx flex-col gap-3">
        <div className="flex flex-col w-full gap-4 mx-auto my-4">
          <Input
            isRequired
            type="email"
            label="Email"
            defaultValue="junior@nextui.org"
          />
          <Button className="bg-primary-700 font-bold">
            Souscrire a la newsletter
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default Newsletter;
