import { database } from "@/core/config/AppwriteConfig";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Models, Query } from "appwrite";
import { AppWriteResponse } from "../core/types/AppWriteResponseInterface";
import { ISubscribesModels } from "@/core/interfaces/Subscribes";
import { IContactsModels } from "@/core/interfaces/Contacts";

const pagination = 10;
const databaseId = "amourdivin";
const CollectionName = "subscribers";

interface ISubscriber {
  id: string;
  name: string;
  email: string;
  create_at: Date;
  message: string;
}
export function useSaveSubscribers() {
  return useMutation({
    mutationKey: ["subscribe/send"],
    async mutationFn(Commentaire: any) {
      const result = await database.createDocument(
        databaseId,
        "contacts",
        "unique()",
        Commentaire
      );
      return result;
    },
    onSuccess: (newPost) => {
      return newPost;
    },
    onError(error: AppWriteResponse, variables, context) {
      // console.log(error);
      return error.message;
    },
  });
}

// export function useGetLastContactsItem() {
//   return useQuery<Models.DocumentList<ContactsModels>, Error>({
//     queryKey: [`GetLastContactsItem`],
//     queryFn: async () => {
//       const result = await database.listDocuments<ContactsModels>(
//         databaseId,
//         "contacts",
//         [Query.limit(1), Query.orderDesc("created_at")]
//       );
//       return result;
//     },
//   });
// }

export function useGetLastContactsItem() {
  return useQuery({
    queryKey: [`GetLastContactsItem`],
    queryFn: async () => {
      const result = await database.listDocuments<IContactsModels>(
        databaseId,
        "contacts",
        [Query.limit(1), Query.orderDesc("created_at")]
      );
      return result;
    },
  });
}

export function useGetLastSubscriptionItem() {
  return useQuery({
    queryKey: [`GetLastSubscriptionItem`],
    queryFn: async () => {
      const result = await database.listDocuments<ISubscribesModels>(
        databaseId,
        CollectionName,
        [Query.limit(1), Query.orderDesc("created_at")]
      );
      return result;
    },
  });
}

export function useCheckIfEmailExists(id: string): boolean {
  const { data } = useQuery({
    queryKey: [`CheckIfEmailExists`, id],
    queryFn: async () => {
      const result = await database.listDocuments<ISubscribesModels>(
        databaseId,
        CollectionName,
        [Query.equal("email", id), Query.orderDesc("created_at")]
      );
      return result;
    },
  });
  let isExists = false;
  if (data?.documents[0] !== undefined) {
    isExists = true;
  } else {
    isExists = false;
  }

  return isExists;
}
