import { Query } from "appwrite";
import { database } from "../config/AppwriteConfig";
import config from "../config/constantes";
import { GeneralSettingsModels } from "../interfaces/general_settings";
import { SettingsModels } from "../interfaces/settings";
import { Postes, IPostsModels } from "../interfaces/posts";

class PosteService {
  private databaseId: string;
  private CollectionName: string;
  private numberOfArticle: number;

  constructor() {
    this.CollectionName = config.collectionNames.poste;
    this.databaseId = config.DatabaseUrl;
    this.numberOfArticle = 5;
  }

  public async get() {
    try {
      const res = await database.listDocuments<IPostsModels>(
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
      const res = await database.listDocuments<IPostsModels>(
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

  public async getInfiniteArticles(pageParam: string | null) {
    try {
      const pagination: string[] = pageParam
        ? [
            Query.limit(this.numberOfArticle),
            Query.cursorAfter(pageParam),
            Query.orderDesc("created_at"),
            Query.equal("visibility", 1),
          ]
        : [
            Query.limit(this.numberOfArticle),
            Query.orderDesc("created_at"),
            Query.equal("visibility", 1),
          ];
      const result = await database.listDocuments<IPostsModels>(
        this.databaseId,
        this.CollectionName,
        pagination
      );
      console.log(result);
      const lastId = result.documents[result.documents.length - 1].$id;
      return Promise.resolve({ ...result, lastId });
    } catch (error: any) {
      return Promise.reject(error);
    }
  }
}

const PostesServices = new PosteService();

export default PostesServices;
