import { Query } from "appwrite";
import { database } from "../config/AppwriteConfig";
import config from "../config/constantes";
import { IPostsModels } from "../interfaces/posts";
import {
  getCurrentMonth,
  getCurrentWeek,
  getCurrentYear,
} from "../utils/helpers.utils";
import { IPostPageviewsMonths } from "../interfaces/PostPageviewsMonth";

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

  /**
   * Recuperer la listes des articles reconnander Get recomended
   * @returns
   */
  public async GetRecommended() {
    try {
      const result = await database.listDocuments<IPostsModels>(
        this.databaseId,
        this.CollectionName,
        [
          Query.limit(5),
          Query.equal("is_recommended", 1),
          Query.orderDesc("created_at"),
        ]
      );

      return Promise.resolve(result);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  /**
   * Recuperer le nombre d'article vue dans la semaines courante
   * @returns
   */
  public async GetPostPageviewsWeek() {
    try {
      const result = await database.listDocuments(
        this.databaseId,
        "post_pageviews_week",
        [
          Query.limit(5),
          Query.orderDesc("created_at"),
          Query.greaterThan("created_at", getCurrentWeek().debut.toString()),
          Query.lessThanEqual("created_at", getCurrentWeek().fin.toString()),
        ]
      );
      console.log(result);
      return Promise.resolve(result);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  public async GetPostPageviewsMonth() {
    try {
      const result = await database.listDocuments(
        this.databaseId,
        "post_pageviews_week",
        [
          Query.limit(5),
          Query.orderDesc("created_at"),
          Query.greaterThan("created_at", getCurrentMonth().debut.toString()),
          Query.lessThanEqual("created_at", getCurrentMonth().fin.toString()),
        ]
      );
      return Promise.resolve(result);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  public async GetPostPageviewsYear() {
    try {
      const result = await database.listDocuments(
        this.databaseId,
        "post_pageviews_week",
        [
          Query.limit(5),
          Query.orderDesc("created_at"),
          Query.greaterThan("created_at", getCurrentYear().debut.toString()),
          Query.lessThanEqual("created_at", getCurrentYear().fin.toString()),
        ]
      );
      console.log(result);
      return Promise.resolve(result);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  public async GetPostPageviewsAllTime() {
    try {
      const result = await database.listDocuments(
        this.databaseId,
        this.CollectionName,
        [Query.limit(5), Query.orderDesc("pageviews")]
      );
      console.log(result);
      return Promise.resolve(result);
    } catch (error: any) {
      return Promise.reject(error);
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
      const lastId = result.documents[result.documents.length - 1].$id;
      return Promise.resolve({ ...result, lastId });
    } catch (error: any) {
      return Promise.reject(error);
    }
  }
}

const PostesServices = new PosteService();

export default PostesServices;
