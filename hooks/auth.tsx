import { ILogin } from "@/core/interfaces/user.interface";
import userService from "@/core/services/user.service";
import { useMutation } from "@tanstack/react-query";
import { AppWriteResponse } from "../core/types/AppWriteResponseInterface";

const prefix = "login";
export const UseLogin = () => {
  return useMutation({
    mutationKey: [`get/${prefix}`],
    mutationFn: async (data: ILogin) => userService.login(data),
    onSuccess: (newPost) => {
      return newPost;
    },
    onError(error: AppWriteResponse) {
      return error;
    },
  });
};
