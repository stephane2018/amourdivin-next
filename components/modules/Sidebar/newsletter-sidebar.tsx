"use client";
import CategoriesHeader from "@/components/modules/categories/categorie-header";
import { subtitle, title } from "@/components/primitives";
import { database } from "@/core/config/AppwriteConfig";
import { ISubscribesModels } from "@/core/interfaces/Subscribes";
import { useGetLastSubscriptionItem } from "@/hooks/useSubscribes";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Snippet,
} from "@nextui-org/react";
import { Query } from "appwrite";
import { Code } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";

interface IFormInputs {
  email: string;
}

const schema = yup.object({
  email: yup
    .string()
    .email("veuillez renseigner un email valide")
    .required("entrer une addresse email"),
});

interface NewsletterProps {}

const Newsletter: FC<NewsletterProps> = () => {
  const { data: LastSubScribeItem } = useGetLastSubscriptionItem();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  function check(id: string) {
    return database.listDocuments<ISubscribesModels>(
      "amourdivin",
      "subscribers",
      [Query.equal("email", id)]
    );
  }

  const onSubmit = (data: IFormInputs) => {
    setLoading(true);
    const today = new Date();
    const lastId: number =
      LastSubScribeItem?.documents[0] !== undefined
        ? Number(LastSubScribeItem?.documents[0].id)
        : 0;
    const newxtIndex = lastId + 1;
    const subscriber = {
      created_at: today,
      email: data.email,
      id: newxtIndex.toString(),
      token: "",
    };
    const result = check(subscriber.email);
    console.log(result);
    result
      .then((data) => {
        // console.log(data);
        if (data?.documents[0] === undefined) {
          database
            .createDocument("amourdivin", "subscribers", "unique()", subscriber)
            .then((c) => {
              toast.success("vous souscription a bien ete prise en compte ", {
                position: "top-right",
              });
            })
            .catch((err) => {
              toast.error("une erreur est survenu", {
                position: "bottom-right",
              });
            });

          setLoading(false);
        } else {
          toast.info("vous avez deja souscris a la newsletter ", {
            position: "top-right",
          });
          setLoading(false);
        }
        reset();
      })
      .catch(() => {
        toast.error("une erreur est survenu", {
          position: "bottom-right",
        });
      });
  };

  return (
    <Card className="border-none  shadow-small  w-full  md:max-w-2xl my-3 flex flex-col ">
      <CardHeader>
        <CategoriesHeader title="Newsletter" hideIcon={false} />
      </CardHeader>
      <CardBody className="felx flex-col gap-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col w-full gap-4 mx-auto my-4">
            <Input
              {...register("email")}
              placeholder="jondoe@gmail.com"
              type="email"
              label="Email"
              defaultValue=""
            />
            <Button
              isLoading={loading}
              type="submit"
              className="bg-primary-700 text-white font-bold"
            >
              Souscrire à la newsletter
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default Newsletter;
