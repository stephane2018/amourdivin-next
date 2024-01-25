import { IUserModels } from "@/core/interfaces/user.interface";
import userService from "@/core/services/user.service";
import { useQuery } from "@tanstack/react-query";
import { Models } from "appwrite";

export function useGetUserById(id: string | false) {
  return useQuery<Models.DocumentList<IUserModels>, Error>({
    queryKey: [`Users/${id}`],
    queryFn: () => {
      console.log(userService.GetUserById(id));
      return userService.GetUserById(id);
    },
    enabled: Boolean(id),
  });
}
