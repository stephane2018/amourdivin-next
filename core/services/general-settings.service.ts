import { Query } from "appwrite";
import { database } from "../config/AppwriteConfig";
import config from "../config/constantes";
import { GeneralSettingsModels } from "../interfaces/general_settings";

class GeneraleSettingService {
  private databaseId: string;

  private CollectionName: string;

  constructor() {
    this.CollectionName = config.collectionNames.general_seetings;
    this.databaseId = config.DatabaseUrl;
  }

  public async getSettings(value: number) {
    try {
      const settings = await database.listDocuments<GeneralSettingsModels>(
        this.databaseId,
        this.CollectionName,
        [Query.equal("id", value), Query.limit(1)]
      );
      return Promise.resolve(settings);
    } catch (error: any) {
      Promise.reject(error);
    }
  }
}
const GeneralSettingsService = new GeneraleSettingService();
export default GeneralSettingsService;
