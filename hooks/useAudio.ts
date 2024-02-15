import { database } from "@/core/config/AppwriteConfig";
import { AudiosModels } from "@/core/interfaces/Audios";
import { PosteAudiosModels } from "@/core/interfaces/PostAudios";
import posteAudiosService from "@/core/services/posteAudios.service";
import { disPlayAudiosUrl } from "@/core/utils/helpers.utils";
import { useQuery } from "@tanstack/react-query";
import { Query, Models } from "appwrite";
import { useCallback, useEffect, useMemo, useState } from "react";

const databaseId = "amourdivin";
const collection_postes = "Audios";

export function useAudios(postId: string, isAudio: boolean) {
  // console.log(postId);
  return useQuery<Models.DocumentList<PosteAudiosModels>, Error>({
    queryKey: [`get/post_audios/${postId}`],
    queryFn: () => posteAudiosService.get(postId),
    enabled: Boolean(isAudio),
    staleTime: Infinity,
  });
}

const getObj = async (audiosPostList: string[]) => {
  const playList = await database
    .listDocuments<AudiosModels>(databaseId, collection_postes, [
      Query.equal("id", audiosPostList),
    ])
    .then((audio) => {
      return audio.documents || [];
    })
    .catch((e) => {
      throw new Error(e);
    });

  if (playList.length > 0) {
    playList.forEach((file, index) => {
      playList[index].audio_path = disPlayAudiosUrl(file.audio_path);
    });
  }

  return playList.length > 0 ? playList : [];
};
export function GetAudioPlayList(id: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [AudioPlayList, setAudioPlayList] = useState<AudiosModels[]>([]);
  const [error, setError] = useState<string | null>();
  const { data: audios } = useAudios(id, true);

  const PlayListes = useMemo(() => {
    const post_id_Audio_List: string[] = [];
    audios?.documents.map((p) =>
      post_id_Audio_List.push(p?.audio_id.toString())
    );

    if (post_id_Audio_List.length > 0) {
      getObj(post_id_Audio_List).then((c) => {
        setAudioPlayList(c);
      });
    } else {
      setAudioPlayList([]);
      setIsLoading(false);
    }
  }, [audios?.documents]);

  return { AudioPlayList, PlayListes, isLoading, error };
}
