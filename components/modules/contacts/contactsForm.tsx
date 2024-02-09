"use client";
import { useGetGeneraleSettings } from "@/hooks/useSettings";
import { useSaveSubscribers } from "@/hooks/useSubscribes";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { ReCAPTCHA } from "react-google-recaptcha";
import { toast } from "sonner";
import { useGetLastContactsItem } from "../../../hooks/useSubscribes";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContactFormSchema, ContactType } from "./schema";
import { Skeleton } from "@nextui-org/react";

export default function ContactForm() {
  const SaveContacsMessage = useSaveSubscribers();
  const { data: generalSettings, isLoading } = useGetGeneraleSettings(1);
  const { data: lastContact } = useGetLastContactsItem();

  const [captcha, setCaptcha] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactType>({
    resolver: yupResolver(ContactFormSchema),
    mode: "onChange",
  });

  const handleSendMessage = async (data: ContactType) => {
    const created_at = new Date();
    if (captcha) {
      toast.error("veuillez valider le recapcha", {
        position: "bottom-right",
      });
    } else if (lastContact !== undefined) {
      const id =
        lastContact?.documents[0].id !== undefined
          ? Number(lastContact?.documents[0].id) + 1
          : 0;
      SaveContacsMessage.mutateAsync({
        ...data,
        id: id.toString(),
        created_at,
      })
        .then((result) => {
          reset();
          toast.success("Votre message a bien été envoyer ", {
            position: "bottom-right",
          });
        })
        .catch((c) => {
          console.log(c);
          toast.error("oops une erreur est survenu ", {
            position: "bottom-right",
          });
        });
    }
  };

  return (
    <div className="mt-3">
      <form className="grid grid-cols-2 gap-3 w-full">
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              type="text"
              label="Nom"
              placeholder="votre nom "
              labelPlacement="outside"
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              type="email"
              label="Email"
              placeholder="you@example.com"
              labelPlacement="outside"
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="message"
          render={({ field, fieldState: { error } }) => (
            <Textarea
              {...field}
              type="text"
              label="votre message "
              placeholder="soyez precis et concis"
              labelPlacement="outside"
              className="col-span-2"
              errorMessage={error?.message}
            />
          )}
        />

        {generalSettings ? (
          <ReCAPTCHA
            sitekey={generalSettings?.documents[0].recaptcha_site_key}
            onChange={setCaptcha}
            className="col-span-2 py-3 rounded-full"
          />
        ) : (
          <Skeleton className="h-20 bg-foreground-100 rounded-lg" />
        )}

        <Button
          type="submit"
          onClick={handleSubmit(handleSendMessage)}
          fullWidth
          isLoading={SaveContacsMessage.isPending}
          className="bg-primary-500 col-span-2  text-white"
        >
          Envoyer
        </Button>
      </form>
    </div>
  );
}
