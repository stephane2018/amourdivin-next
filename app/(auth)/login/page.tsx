"use client";
import { account } from "@/core/config/AppwriteConfig";
import {
  Button,
  Card,
  CardBody,
  Input,
  Link,
  useUser,
} from "@nextui-org/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILogin } from "@/core/interfaces/user.interface";
import { LoginSchema } from "@/core/validations/login.validations";
import { UseLogin } from "@/hooks/auth";
import { Color } from "../../../core/types/types";
import { AlertCircle } from "lucide-react";
import useTimeOutMessage from "@/hooks/commom/useTimeOutMessage";
import Alert from "@/components/ui/Alert";
import { AppWriteResponse } from "@/core/types/AppWriteResponseInterface";

export default function Home() {
  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm<ILogin>({
    resolver: yupResolver(LoginSchema),
    mode: "onChange",
  });

  const login = UseLogin();
  const [message, setMessage] = useTimeOutMessage();

  const handleLogin: SubmitHandler<ILogin> = async (data) => {
    login
      .mutateAsync(data)
      .then((result) => {
        console.log(login);
      })
      .catch((error: AppWriteResponse) => {
        console.log(error);
        if (
          login.error?.message
            .toString()
            .includes("Password must be at least 8 characters")
        ) {
          setMessage("Veuillez entrer un mot de passe valide");
        } else if (
          login.error?.message
            .toString()
            .includes("Please check the email and password")
        ) {
          setMessage(" votre email ou mot de passe est incorrect ");
        } else if (
          login.error?.message
            .toString()
            .includes("Rate limit for the current endpoint ")
        ) {
          setMessage(" trop d'essais veuillez réssayer plustard ");
        } else if (
          login.error?.message.toString().includes("Network request failed")
        ) {
          setMessage(" veuillez verifiez votre connexion internet ");
        }
      });
  };
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="flex flex-col w-full items-center ">
        <Card className="max-w-md  h-fit gap-4 p-4">
          <CardBody className="overflow-hidden gap-4">
            {/* <div className="my-1 ml-4 mr-5 cursor-pointer justify-center rounded-md border-2 border-gray-400/20 bg-primary-800 p-2 text-center font-medium text-white transition-colors duration-300  hover:bg-primary-900"> */}
            <div className="mx-auto flex flex-col py-3 text-center">
              <div className="ml-[0.80rem] text-2xl font-semibold ">
                Content de vous revoir!
              </div>
              <div className="ml-[0.90rem] text-sm font-normal">
                Connectez-vous pour accéder à votre compte
              </div>
            </div>

            {message ? (
              <div
                id="alert-border-2"
                className=" mb-4 flex rounded border-t-4 border-red-500 bg-red-100 p-4 dark:bg-red-200"
                role="alert"
              >
                <svg
                  className="h-5 w-5 flex-shrink-0 text-red-700"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="ml-3 !text-xs font-medium text-red-700">
                  {message.toString()}
                </div>
                <button
                  type="button"
                  className="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-red-100 p-1.5 text-red-500 hover:bg-red-200 focus:ring-2 focus:ring-red-400 dark:bg-red-200 dark:hover:bg-red-300"
                  data-dismiss-target="#alert-border-2"
                  aria-label="Close"
                >
                  <span className="sr-only">fermer</span>
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ) : null}
            <Button className="bg-blue-700 text-white" fullWidth>
              Continuer avec facebook{" "}
            </Button>

            <Button className="bg-primary-600 text-white" fullWidth>
              Continuer avec google{" "}
            </Button>

            <form
              onSubmit={handleSubmit(handleLogin)}
              className="flex flex-col gap-4"
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    isRequired
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    isRequired
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                  />
                )}
              />

              <p className="text-center text-small">
                Need to create an account?{" "}
                <Link
                  size="sm"
                  onPress={() => {
                    console.log("fdshfds");
                  }}
                >
                  Sign up
                </Link>
              </p>
              <div className="flex gap-2 justify-end">
                <Button
                  type="submit"
                  fullWidth
                  className="bg-primary-500 text-white"
                  isLoading={login.isPending}
                >
                  Login
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
