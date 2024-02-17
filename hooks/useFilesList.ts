import { database } from "@/core/config/AppwriteConfig";
import { FilesModels } from "@/core/interfaces/Files";
import { disPlayFileUrl } from "@/core/utils/helpers.utils";
import { Query } from "appwrite";
import { useMemo, useState } from "react";
import { usePostFile } from "./usePostes";

const databaseId = "amourdivin";
const collection_postes = "files";

const getObj = async (filePostList: string[]) => {
  const fileListData = await database
    .listDocuments<FilesModels>(databaseId, collection_postes, [
      Query.equal("id", filePostList),
    ])
    .then((files) => {
      return files.documents || [];
    })
    .catch((e) => {
      throw new Error(e);
    });
  if (fileListData.length > 0) {
    fileListData.forEach((file, index) => {
      fileListData[index].file_path = disPlayFileUrl(file.file_path);
    });
  }

  return fileListData.length > 0 ? fileListData : [];
};
const useGetFilesList = (id: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [FilePlayList, setFilePlayList] = useState<FilesModels[]>([]);
  const [isError, setIsError] = useState<string | null>();
  const { data: files } = usePostFile(id);
  const FileListes = useMemo(() => {
    setIsLoading(true);
    const post_id_list_fileList: string[] = [];
    files?.documents.map((p) =>
      post_id_list_fileList.push(p?.file_id.toString())
    );

    if (post_id_list_fileList.length > 0) {
      getObj(post_id_list_fileList)
        .then((c) => {
          setFilePlayList(c);
          setIsLoading(false);
        })
        .catch((e) => {
          setIsError(e);
          setIsLoading(false);
        });
    } else {
      setFilePlayList([]);
      setIsLoading(false);
    }
  }, [files?.documents]);

  return { FilePlayList, FileListes, isLoading, isError };
};

export default useGetFilesList;
