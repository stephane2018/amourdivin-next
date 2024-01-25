import { PostsModels } from "@/core/interfaces/posts";
import posteService from "@/core/services/poste.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Models } from "appwrite";

/**
 * @returns
 */
const GetFeatured = () => {
  return useQuery({
    queryKey: [`Featured`],
    queryFn: () => posteService.GetFeatured(),
  });
};

export { GetFeatured };
