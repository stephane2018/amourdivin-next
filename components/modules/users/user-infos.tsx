/* eslint-disable @next/next/no-async-client-component */
"use client";
import { IUserModels } from "@/core/interfaces/user.interface";
import userService from "@/core/services/user.service";
import { disPlayImageUrl } from "@/core/utils/helpers.utils";
import { useGetUserById } from "@/hooks/useUser";
import { Avatar, Skeleton, User } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

export default function UserInfosChip({
  id,
  type = "SIMPLE",
}: {
  id: string;
  type?: "SIMPLE" | "DETAILS";
}) {
  const { data, isLoading } = useGetUserById(id);
  const [userInfos, setUserInfos] = useState<IUserModels | null>(null);

  useEffect(() => {
    if (data) {
      setUserInfos(data);
    }
  }, [data]);

  return isLoading ? (
    <Skeleton className="flex rounded-md w-6 h-6" />
  ) : type === "DETAILS" ? (
    <div className="flex gap-2 rounded-lg">
      <User
        name={userInfos?.username}
        description={userInfos?.about_me}
        avatarProps={{
          src: disPlayImageUrl(userInfos?.avatar || ""),
        }}
      />
    </div>
  ) : (
    <div className="flex gap-2 rounded-lg">
      <Avatar
        isBordered
        radius="sm"
        className="h-6 w-6 hidden md:flex "
        src={disPlayImageUrl(userInfos?.avatar || "")}
      />
      <div className="flex flex-col gap-1 items-start justify-center">
        <h4 className="text-[0.60rem] md:text-sm cursor-pointer font-semibold leading-none text-default-600">
          {userInfos?.username}
        </h4>
      </div>
    </div>
  );
}
