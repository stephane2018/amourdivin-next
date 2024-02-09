import { Query } from "appwrite";
import { toast } from "sonner";
import config from "../config/constantes";
import { database } from "../config/AppwriteConfig";
import { IPagesModels } from "../interfaces/Pages";

class PageService {
  private databaseId: string;

  private CollectionName: string;

  constructor() {
    this.CollectionName = config.collectionNames.pages;
    this.databaseId = config.DatabaseUrl;
  }

  public async getPages() {
    try {
      const promise = await database.listDocuments<IPagesModels>(
        this.databaseId,
        this.CollectionName,
        [
          Query.limit(5),
          Query.equal("visibility", "1"),
          Query.equal("need_auth", "0"),
          Query.equal("need_auth", "0"),
          Query.equal("location", "top"),
          Query.equal("page_type", "page"),
          Query.equal("lang_id", "1"),
        ]
      );
      return Promise.resolve(promise);
    } catch (error: any) {
      toast.error(error.message);
      return Promise.reject(error);
    }
  }

  public async getPagesBySlug(slug: string) {
    try {
      const promise = await database.listDocuments<IPagesModels>(
        this.databaseId,
        this.CollectionName,
        [Query.limit(1), Query.equal("slug", slug)]
      );
      return Promise.resolve(promise);
    } catch (error: any) {
      toast.error(error.message);
      return Promise.reject(error);
    }
  }
}
export default new PageService();
