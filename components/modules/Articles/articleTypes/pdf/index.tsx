"use client";
import { IPostsModels } from "@/core/interfaces/posts";
import handleDownloadFile from "@/core/utils/doanloadFile";
import useGetFilesList from "@/hooks/useFilesList";
import { Button } from "@nextui-org/button";
import { CircularProgress } from "@nextui-org/react";
import { HardDriveDownload } from "lucide-react";
import { useState } from "react";

const FileList = ({ article }: { article: IPostsModels }) => {
  const [currentFileDownload, setCurrentFileDownload] = useState("");
  const {
    FilePlayList,
    isLoading: isLoadingFile,
    isError: isErrorFileList,
  } = useGetFilesList(article?.id);
  return (
    <ol className="list-decimal w-full   gap-4">
      {FilePlayList.map((item, key) => (
        <li
          key={item.$id}
          className={`dark:bg-black/60 flex  items-center w-full  p-2  my-2 rounded-xl justify-between
          `}
        >
          <span className="cursor-pointer hover:underline hover:text-primary-500 transition-colors duration-300">
            {item.file_name}
          </span>
          <Button
            isIconOnly
            color="warning"
            variant="faded"
            aria-label="download"
            onClick={() => {
              setCurrentFileDownload(item.$id);
              handleDownloadFile({
                url: item.file_path,
                fileName: item.file_name,
              })
                .then(() => setCurrentFileDownload(""))
                .catch(() => setCurrentFileDownload(""));
            }}
          >
            {currentFileDownload == item.$id ? (
              <CircularProgress size="sm" color="success" />
            ) : (
              <HardDriveDownload />
            )}
          </Button>
        </li>
      ))}
    </ol>
  );
};
export default FileList;
