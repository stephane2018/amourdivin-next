import { Query } from "appwrite";
import { database } from "../config/AppwriteConfig";
import config from "../config/constantes";
import { SettingsModels } from "../interfaces/settings";

class SettingService {
  private databaseId: string;
  private CollectionName: string;

  constructor() {
    this.CollectionName = config.collectionNames.settings;
    this.databaseId = config.DatabaseUrl;
  }

  public async get() {
    try {
      const res = await database.listDocuments<SettingsModels>(
        this.databaseId,
        this.CollectionName,
        [Query.equal("id", 1), Query.limit(1)]
      );
      if (!res) {
        console.log(res);
        return null;
      }
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
const SettingServices = new SettingService();
export default SettingServices;
