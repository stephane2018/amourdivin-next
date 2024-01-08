import { Query } from "appwrite";
import { database } from "../config/AppwriteConfig";
import config from "../config/constantes";
import { GeneralSettingsModels } from "../interfaces/general_settings";
import { SettingsModels } from "../interfaces/settings";
import { Postes, PostsModels } from "../interfaces/posts";

class PostegService {
  private databaseId: string;

  private CollectionName: string;

  constructor() {
    this.CollectionName = config.collectionNames.poste;
    this.databaseId = config.DatabaseUrl;
  }

  public async get() {
    try {
      const res = await database.listDocuments<PostsModels>(
        this.databaseId,
        this.CollectionName,
        [
          Query.limit(5),
          Query.equal("is_featured", 1),
          Query.orderDesc("featured_order"),
        ]
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

  public async GetFeatured() {
    try {
      const res = await database.listDocuments<PostsModels>(
        this.databaseId,
        this.CollectionName,
        [
          Query.limit(5),
          Query.equal("is_featured", 1),
          Query.orderDesc("featured_order"),
        ]
      );
      if (!res) {
        return null;
      }
      return res;
    } catch (error: any) {
      return null;
    }
  }
}
export default new PostegService();
