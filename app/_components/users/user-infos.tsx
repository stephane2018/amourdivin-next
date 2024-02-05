/* eslint-disable @next/next/no-async-client-component */
import { ICategories } from "@/core/interfaces/categories";
import { IUserModels } from "@/core/interfaces/user.interface";
import CategorieServices from "@/core/services/categories.service";
import userService from "@/core/services/user.service";
import {
  disPlayImageForFrontUrl,
  disPlayImageUrl,
} from "@/core/utils/helpers.utils";
import { Link } from "@nextui-org/link";
import { Avatar, Skeleton } from "@nextui-org/react";
import React, { FC, useCallback, useEffect, useState } from "react";

export default function UserInfosChip({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userInfos, setUserInfos] = useState<IUserModels | null>(null);
  const getUserInfos = useCallback(async (id: string) => {
    return userService
      .GetUserById(id)
      .then((result) => {
        setIsLoading(false);
        return result;
      })
      .catch((err) => {
        setIsLoading(false);
        throw new Error("Failed to fetch data");
      });
  }, []);

  useEffect(() => {
    if (id) {
      getUserInfos(id).then((item) => {
        setUserInfos(item[0]);
      });
    }
  }, [getUserInfos, id]);

  return isLoading ? (
    <Skeleton className="flex rounded-md w-6 h-6" />
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
