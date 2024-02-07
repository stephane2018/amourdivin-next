import CommentaireService from "@/core/services/comments.service";
import { useQuery } from "@tanstack/react-query";

export function useGetCommentsOfOnePostes(id: string, enable = false) {
  return useQuery({
    queryKey: [`article/comments/${id}`],
    queryFn: () => CommentaireService.CommentsOfOnePostes(id),
    enabled: Boolean(enable),
  });
}
