import { ID, Models, Query } from "appwrite";
import { toast } from "sonner";
import config from "../config/constantes";
import { database } from "../config/AppwriteConfig";

class GeneriqueServices {
  private databaseId: string;

  constructor() {
    this.databaseId = config.DatabaseUrl;
  }

  public async GetLasteElement<T extends Models.Document>(
    CollectionName: string,
    condition?: string[]
  ): Promise<T | null> {
    try {
      const promise = await database.listDocuments<T>(
        this.databaseId,
        CollectionName,
        condition ?? [Query.limit(1), Query.orderDesc("$createdAt")]
      );
      return Promise.resolve(promise.documents[0] ?? null);
    } catch (error: any) {
      toast.error(error.message);
      return Promise.reject(error);
    }
  }

  public async Match<T extends Models.Document>(
    CollectionName: string,
    condition?: string[]
  ): Promise<Models.DocumentList<T> | null> {
    try {
      const promise = await database.listDocuments<T>(
        this.databaseId,
        CollectionName,
        condition
      );
      return Promise.resolve(promise);
    } catch (error: any) {
      toast.error(error.message);
      return Promise.reject(error);
    }
  }

  public Save(CollectionName: string, data: any, id?: string | null) {
    try {
      const result = database.createDocument(
        this.databaseId,
        CollectionName,
        ID.unique(),
        data
      );
      return Promise.resolve(result);
    } catch (error: any) {
      toast.error(error.message);
      return Promise.reject(error);
    }
  }
}
const GeneriqueService = new GeneriqueServices();
export default GeneriqueService;
