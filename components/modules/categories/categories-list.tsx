//LoadMoreArticles
"use client";
import React, { FC } from "react";

import { IPostsModels } from "@/core/interfaces/posts";
import { Button } from "@nextui-org/button";
import { useInfiniteQuery } from "@tanstack/react-query";
import posteService from "@/core/services/poste.service";
import ArticleHorizontalItem from "../Articles/article-horizontal";
import ArticleSkeletonList from "../Articles/skeleton/articleSkeleton";
import CategorieServices from "@/core/services/categories.service";
import PostesServices from "@/core/services/poste.service";
import { Card } from "@nextui-org/card";
import { isMobileOnly } from "react-device-detect";

const SVGPropsSpinner = () => {
  return (
    <svg
      className="animate-spin h-5 w-5 text-current"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        fill="currentColor"
      />
    </svg>
  );
};
interface ICategoriesList {
  slug: string | undefined;
  subCategoriesIdList: string[] | [];
}

const LoadMoreCategories: FC<ICategoriesList> = ({
  slug,
  subCategoriesIdList,
}) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["categories/loadmore", subCategoriesIdList],
    queryFn: async ({ pageParam = "" }) =>
      PostesServices.getInfiniteArticlesCategoriesList(
        pageParam,
        subCategoriesIdList
      ),
    initialPageParam: "",
    getNextPageParam: (lastPage, pages) => lastPage.lastId,
  });

  return (
    <div className="w-full mx-auto ">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4  ">
        {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.documents
              .filter((c) => c.status === "1")
              .map((article) => (
                <ArticleHorizontalItem
                  isVertical={isMobileOnly ? false : true}
                  isInCategoriePage={true}
                  key={article.$id}
                  article={article}
                />
              ))}
          </React.Fragment>
        ))}
      </div>
      {isLoading || isFetchingNextPage ? (
        <ArticleSkeletonList
          item={10}
          isvertical={isMobileOnly ? false : true}
        />
      ) : null}

      {data?.pages === undefined ? (
        <Card className="gap-4 flex h-36 justify-center items-center">
          Aucun article disponible dans cette categorie
        </Card>
      ) : null}

      <Button
        onClick={() => fetchNextPage()}
        isLoading={status === "pending"}
        disabled={!hasNextPage || isFetchingNextPage}
        spinner={<SVGPropsSpinner />}
        className="w-full text-white bg-primary-700 "
      >
        {isFetchingNextPage
          ? "Chargement ... "
          : hasNextPage
          ? " Charger plus d'article"
          : "chargez plus "}
      </Button>
    </div>
  );
};

export default LoadMoreCategories;
