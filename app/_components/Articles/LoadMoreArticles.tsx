//LoadMoreArticles

"use client";
import { useCallback, useEffect, useRef, useState } from "react";

import Link from "next/link";
import useInView from "@/hooks/useInView";
import { IPostsModels } from "@/core/interfaces/posts";
import { Postes } from "../../../core/interfaces/posts";
import PostesServices from "@/core/services/poste.service";
import { Button } from "@nextui-org/button";
import ArticleHorizontalItem from "./article-horizontal";
import ArticleSkeletonList from "./skeleton/articleSkeleton";

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
  const container = useRef<HTMLDivElement | null>(null);
  const [articleData, setArticleData] = useState<DataType>({
    total: null,
    cursor: "",
    articles: [],
  });
  const [cursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const remainder = (articleData?.total as number) % 2;

  const loadArticle = useCallback(async (cursor: string | null) => {
    setLoading(true);
    await PostesServices.getInfiniteArticles(cursor || null)
      .then((res) => {
        setArticleData((prevData) => ({
          total: res?.total,
          cursor: res.lastId || "",
          articles: [...prevData.articles, ...res?.documents],
        }));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (cursor === null) {
      loadArticle(null);
    }
  }, [cursor, loadArticle]);

  return (
    <div>
      {articleData.articles?.map((article, i) => {
        return <ArticleHorizontalItem key={i} article={article} />;
      })}
      {loading || (articleData.articles.length <= 0 && <ArticleSkeletonList />)}

      {articleData.articles?.length - remainder !==
        (articleData?.total as number) - 20 &&
      articleData.articles.length >= 0 ? (
        <div ref={container} className="flex justify-center">
          <Button
            onClick={() => {
              loadArticle(articleData.cursor);
            }}
            isLoading={loading}
            spinner={<SVGPropsSpinner />}
            className="w-full text-white bg-primary-700 "
          >
            Charger plus d&apos;article
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default LoadMoreArticles;
