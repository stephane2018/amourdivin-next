import { useMutation, useQuery } from "@tanstack/react-query";
import { account } from "../config/AppwriteConfig";
import { AppWriteResponse } from "../types/AppWriteResponseInterface";
import { ILoginType } from "../interfaces/user.interface";

export function useLogin() {
  return useMutation({
    mutationFn: (data: ILoginType) =>
      account.createEmailSession(data.email, data.password),
    onError(error: AppWriteResponse, variables, context) {
      // console.log(error);
      return error;
    },
  });
}
