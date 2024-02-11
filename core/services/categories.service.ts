import { Query } from "appwrite";
import { database } from "../config/AppwriteConfig";
import config from "../config/constantes";
import { ICategories } from "../interfaces/categories";
import { IPostsModels } from "../interfaces/posts";

const pagination = 100;

class CategorieService {
  private databaseId: string;

  private CollectionName: string;
  private numberOfArticle: number;

  constructor() {
    this.CollectionName = config.collectionNames.categories;
    this.databaseId = config.DatabaseUrl;
    this.numberOfArticle = 5;
  }

  public async get() {
    try {
      const result = await database.listDocuments<ICategories>(
        this.databaseId,
        this.CollectionName,
        [Query.limit(pagination), Query.orderAsc("created_at")]
      );
      if (!result) {
        return null;
      }
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * get categories by id
   * @returns
   */
  public async getCategorieById(id: string) {
    try {
      const result = await database.listDocuments<ICategories>(
        this.databaseId,
        this.CollectionName,
        [Query.equal("id", id), Query.orderAsc("created_at")]
      );
      if (!result) {
        return null;
      }
      return Promise.resolve(result.documents);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Ges parents categories
   * @returns
   */
  public async getParentCategorie(id: string) {
    try {
      const result = await database.listDocuments<ICategories>(
        this.databaseId,
        this.CollectionName,
        [
          Query.equal("parent_id", "0"),
          Query.equal("id", [id]),
          Query.orderAsc("created_at"),
        ]
      );
      if (!result) {
        return null;
      }
      return Promise.resolve(result.documents);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Recuperationm des sous categories d'une sous categories
   * @returns
   */
  public async getSubCategories(id: string) {
    try {
      const result = await database.listDocuments<ICategories>(
        this.databaseId,
        this.CollectionName,
        [Query.equal("parent_id", id), Query.orderAsc("created_at")]
      );
      if (!result) {
        return null;
      }

      return Promise.resolve(result.documents);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Recuperation  de la categories parents
   * @returns
   */
  public async getParentCategorieBySlug(slug: string) {
    try {
      const result = await database.listDocuments<ICategories>(
        this.databaseId,
        this.CollectionName,
        [
          Query.equal("parent_id", "0"),
          Query.equal("name_slug", slug),
          Query.orderAsc("created_at"),
        ]
      );
      if (!result) {
        return null;
      }

      return Promise.resolve(result.documents[0]);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  public async getCategoriesParentBaseOnChild(id: string) {
    try {
      const childCategories = await database.listDocuments<ICategories>(
        this.databaseId,
        this.CollectionName,
        [Query.equal("id", [id])]
      );
      const getParentCategorie = await this.getParentCategorie(
        childCategories.documents[0].parent_id
      );

      return Promise.resolve(getParentCategorie || []);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  public async getCategoriesParents() {
    try {
      const categories = await database.listDocuments<ICategories>(
        this.databaseId,
        this.CollectionName,
        [Query.equal("parent_id", "0"), Query.orderAsc("created_at")]
      );
      return Promise.resolve(categories || []);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

const CategorieServices = new CategorieService();
export default CategorieServices;
