import { IUserModels } from "@/core/interfaces/user.interface";
import userService from "@/core/services/user.service";
import { useQuery } from "@tanstack/react-query";
import { Models } from "appwrite";

export function useGetUserById(id: string | false) {
  return useQuery({
    queryKey: [`Users/${id}`],
    queryFn: () => userService.GetUserById(id),
    enabled: Boolean(id),
  });
}
