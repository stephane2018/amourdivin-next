import { Models, Query } from "appwrite";
import config from "../config/constantes";
import { database } from "../config/AppwriteConfig";

class GeneriqueService {
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
      return Promise.reject(error);
    }
  }

  public Save(CollectionName: string, id: string, data: any) {
    try {
      const result = database.createDocument(
        this.databaseId,
        CollectionName,
        id,
        data
      );
      return Promise.resolve(result);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }
}
export default new GeneriqueService();
