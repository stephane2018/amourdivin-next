//LoadMoreArticles
"use client";
import React from "react";

import { IPostsModels } from "@/core/interfaces/posts";
import { Button } from "@nextui-org/button";
import ArticleHorizontalItem from "./article-horizontal";
import ArticleSkeletonList from "./skeleton/articleSkeleton";
import { useInfiniteQuery } from "@tanstack/react-query";
import posteService from "@/core/services/poste.service";

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
interface DataType {
  total: number | null;
  cursor: string;
  articles: IPostsModels[] | [];
}
const LoadMoreArticles = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["projects/loadmore"],
    queryFn: ({ pageParam = "" }) =>
      posteService.getInfiniteArticles(pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage, pages) => lastPage.lastId,
  });

  return (
    <div>
      {data?.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.documents
            .filter((c) => c.status === "1")
            .map((article) => (
              <ArticleHorizontalItem key={article.$id} article={article} />
            ))}
        </React.Fragment>
      ))}
      {status === "pending" || (isFetchingNextPage && <ArticleSkeletonList />)}

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

export default LoadMoreArticles;
