/* eslint-disable @next/next/no-async-client-component */
"use client";
import { useGetCommentsOfOnePostes } from "@/hooks/useComments";
import { Button, Skeleton } from "@nextui-org/react";
import { Eye, MessageCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function ArticleComment({
  id,
  view,
}: {
  id: string;
  view: number;
}) {
  const { data, isLoading } = useGetCommentsOfOnePostes(`${id}`, true);
  const [commentLenght, setCommentLenght] = useState<number>(0);

  useEffect(() => {
    if (data) {
      setCommentLenght(data.total);
    }
  }, [data, id]);

  return isLoading ? (
    <Skeleton className="flex rounded-md w-6 h-6" />
  ) : (
    <div className="flex gap-2 rounded-lg">
      <div className="hidden md:flex">
        <Button
          variant="light"
          radius="lg"
          size="sm"
          aria-label="more than 99 notifications"
        >
          <MessageCircle size={15} className="hide" />
          <p>{Number(commentLenght)}</p>
        </Button>
        <Button
          radius="lg"
          aria-label="more than 99 notifications"
          variant="light"
          size="sm"
        >
          <Eye size={15} />
          {view || "0"}
        </Button>
      </div>
      <div className="flex md:hidden gap-3">
        <div className="flex gap-1 cursor-pointer bg-default-300 text-xs bg-inherit justify-center items-center">
          <MessageCircle size={10} />
          <p>{Number(commentLenght)}</p>
        </div>
        <div className="flex text-xs cursor-pointer bg-default-100 items-center gap-2 bg-inherit">
          <Eye size={10} />
          {Number(view)}
        </div>
      </div>
    </div>
  );
}
