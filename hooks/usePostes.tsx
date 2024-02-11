import { database } from "@/core/config/AppwriteConfig";
import config from "@/core/config/constantes";
import { IPostPageviewsMonths } from "@/core/interfaces/PostPageviewsMonth";
import { IPostsModels } from "@/core/interfaces/posts";
import PostesServices from "@/core/services/poste.service";
import posteService from "@/core/services/poste.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Models, Query } from "appwrite";
import { useMemo, useState } from "react";
import { getCurrentYear } from "../core/utils/helpers.utils";

const prefix = "articles";
const CollectionName = "648db34bdfd761afd139";
const databasesId = "amourdivin";

/**
 * @returns
 */
const GetFeatured = () => {
  return useQuery({
    queryKey: [`Featured`],
    queryFn: () => posteService.GetFeatured(),
  });
};

/**
 * Recuperer les articles recommander
 * @returns
 */
export function useGetRecomendedPosts() {
  return useQuery({
    queryKey: [`${prefix}/GetRecomandedPosts`],
    queryFn: () => PostesServices.GetRecommended(),
  });
}

const getObj = async (audiosPostList: string[] | number[]) => {
  return database
    .listDocuments<IPostsModels>(
      config.DatabaseUrl,
      config.collectionNames.poste,
      [Query.equal("id", audiosPostList)]
    )
    .then((result) => result.documents || [])
    .catch((e) => {
      throw new Error(e);
    });
};

/**
 *
 * @param enable Recuperer  les articles de la semaines
 * @returns
 */
export function useGetPopularPostWeek(enable = false) {
  return useQuery({
    queryKey: [`${prefix}/GetPopularArtucleInWeek`],
    queryFn: async () => {
      const result = await PostesServices.GetPostPageviewsWeek();

      return result;
    },
    enabled: Boolean(enable),
  });
}

export function useGetPopularPostsForTheCurrentWeek(enable = false) {
  const [isLoadingAll, setisLoadingAll] = useState(false);
  const [PosteCurrenWeekList, setPosteCurrenWeekList] = useState<
    IPostsModels[]
  >([]);

  const [isError, setIsError] = useState<Error | null>();
  const { data: postes, error } = useGetPopularPostWeek(enable);

  const PostesListForWeek = useMemo(() => {
    setisLoadingAll(true);
    const post_id_list_week: number[] = [];
    if (postes?.documents) {
      postes?.documents.map((p) => post_id_list_week.push(p?.post_id));
      getObj(post_id_list_week)
        .then((c) => {
          setPosteCurrenWeekList(c);
          setisLoadingAll(false);
        })
        .catch((e) => {
          setIsError(e);
          setisLoadingAll(false);
        });
    }
  }, [postes?.documents]);

  return { PosteCurrenWeekList, PostesListForWeek, isLoadingAll, isError };
}

export function useGetPopularPostsOfCurrentMonth(enable = false) {
  return useQuery({
    queryKey: [`${prefix}/GetPopularPostsM`],
    queryFn: () => PostesServices.GetPostPageviewsMonth(),
    enabled: Boolean(enable),
  });
}
export function useGetPopularPostsForTheCurrentMonths(enable = false) {
  const [isLoadingAll, setisLoadingAll] = useState(false);
  const [PosteCurrentMonthList, setPosteCurrentMonthList] = useState<
    IPostsModels[]
  >([]);
  const [isError, setIsError] = useState<Error | null>();
  const { data: postes } = useGetPopularPostsOfCurrentMonth(enable);

  const PostesListForMonth = useMemo(() => {
    setisLoadingAll(true);
    const post_id_list_week: number[] = [];
    postes?.documents.map((p) => post_id_list_week.push(p?.post_id));
    getObj(post_id_list_week)
      .then((c) => {
        setPosteCurrentMonthList(c);
        setisLoadingAll(false);
      })
      .catch((e) => {
        setisLoadingAll(false);
        setIsError(e);
      });
  }, [postes?.documents]);

  return { PosteCurrentMonthList, isLoadingAll, PostesListForMonth, isError };
}

export function useGetPopularPostyear(enable = true) {
  return useQuery({
    queryKey: [`postes/GetPopularPostsYear`],
    queryFn: () => PostesServices.GetPostPageviewsYear(),
    enabled: Boolean(enable),
  });
}

export function useGetPopularPostAllTime(enable = true) {
  return useQuery({
    queryKey: [`postes/GetPopularPostsAllTime`],
    queryFn: () => PostesServices.GetPostPageviewsAllTime(),
    enabled: Boolean(enable),
  });
}
// export function useGetPopularPostsForTheCurrentyear(enable = false) {
//   const [isLoadingAll, setisLoadingAll] = useState(false);
//   const [PosteCurrenyearList, setPosteCurrenyearList] = useState<
//     IPostsModels[]
//   >([]);
//   const [isError, setIsError] = useState<Error | null>();
//   const { data: postes } = useGetPopularPostyear(enable);

//   const PostesListForYear = useMemo(() => {
//     setisLoadingAll(true);
//     const post_id_list_week: number[] = [];
//     postes?.documents.map((p) => post_id_list_week.push(p?.post_id));
//     getObj(post_id_list_week)
//       .then((c) => {
//         setPosteCurrenyearList(c);
//         setisLoadingAll(false);
//       })
//       .catch((e) => {
//         setIsError(e);
//         setisLoadingAll(false);
//       });
//   }, [postes?.documents]);

//   return { PosteCurrenyearList, PostesListForYear, isLoadingAll, isError };
// }

export { GetFeatured };
