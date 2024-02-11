/* eslint-disable @next/next/no-async-client-component */
"use client";
import { ICategories } from "@/core/interfaces/categories";
import CategorieServices from "@/core/services/categories.service";
import { Link } from "@nextui-org/link";
import { Skeleton } from "@nextui-org/react";
import React, { FC, useCallback, useEffect, useState } from "react";

export default function CategorieChip({
  id,
  isCategoriesPage = false,
}: {
  id: string;
  isCategoriesPage?: boolean;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<ICategories | null>(null);

  const getCategorie = useCallback(async (id: string) => {
    return CategorieServices.getCategoriesParentBaseOnChild(id)
      .then((result) => {
        setIsLoading(false);
        false;
        return result;
      })
      .catch((err) => {
        setIsLoading(false);
        throw new Error("Failed to fetch data");
      });
  }, []);

  const getCategorieById = useCallback(async (id: string) => {
    return CategorieServices.getCategorieById(id)
      .then((result) => {
        setIsLoading(false);
        false;
        return result;
      })
      .catch((err) => {
        setIsLoading(false);
        throw new Error("Failed to fetch data");
      });
  }, []);

  useEffect(() => {
    if (id) {
      getCategorie(id).then((item) => {
        setCategories(item[0]);
      });
    }
    if (isCategoriesPage) {
      getCategorieById(id).then((item) => {
        if (item) setCategories(item[0]);
      });
    }
  }, [getCategorie, getCategorieById, isCategoriesPage, id]);

  return isLoading ? (
    <Skeleton className="rounded-xl w-10 h-3" />
  ) : (
    <Link
      href="#"
      style={{
        backgroundColor: categories ? categories.color : "",
      }}
      className="px-2 py-1 w-fit gap-2 text-[0.60rem] md:text-xs text-white rounded-md "
    >
      {categories?.name}
    </Link>
  );
}
