import { database } from "@/core/config/AppwriteConfig";
import { GeneralSettingsModels } from "@/core/interfaces/general_settings";
import { SettingsModels } from "@/core/interfaces/settings";
import { useQuery } from "@tanstack/react-query";
import { Models, Query } from "appwrite";

const nbrePostes = 10;
const CollectionName = "settings";
const CollectionGeneraleSettings = "general_settings";
const databasesId = "amourdivin";

export function useGetSettings(value: number) {
  return useQuery<Models.DocumentList<SettingsModels>, Error>({
    queryKey: [`get/settings/${value}`],
    async queryFn() {
      const result = await database.listDocuments<SettingsModels>(
        databasesId,
        CollectionName,
        [Query.equal("id", value), Query.limit(1)]
      );
      // console.log(result);
      return result;
    },
  });
}

export function useGetGeneraleSettings(value: number) {
  return useQuery<Models.DocumentList<GeneralSettingsModels>, Error>({
    queryKey: [`get/general_settings/${value}`],
    async queryFn() {
      const result = await database.listDocuments<GeneralSettingsModels>(
        databasesId,
        CollectionGeneraleSettings,
        [Query.equal("id", value), Query.limit(1)]
      );
      return result;
    },
  });
}
