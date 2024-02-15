import { ID, Query } from "appwrite";
import GeneriqueService from "./generique.service";
import config from "../config/constantes";
import { PosteAudiosModels, PosteAudiosSubmit } from "../interfaces/PostAudios";
import { database } from "../config/AppwriteConfig";

class PostesAudioServices {
  private databaseId: string;

  private CollectionName: string;

  constructor() {
    this.CollectionName = config.collectionNames.posts_audios;
    this.databaseId = config.DatabaseUrl;
  }

  /**
   *  récuperer la listes des audios pout un postes
   * @param post_id
   * @returns
   */
  public async getlastElement() {
    try {
      const result = await GeneriqueService.GetLasteElement<PosteAudiosModels>(
        this.CollectionName,
        [Query.limit(1), Query.orderDesc("$createdAt")]
      );
      return Promise.resolve(result);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  /**
   *  récuperer la listes des audios pout un postes
   * @param post_id
   * @returns
   */
  public async get(post_id: string) {
    try {
      const promise = await database.listDocuments<PosteAudiosModels>(
        this.databaseId,
        this.CollectionName,
        [Query.equal("post_id", Number(post_id))]
      );
      return Promise.resolve(promise);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  /**
   * Enregistrer la  audios en fonction d'un postes
   * @param post_id
   * @returns
   */
  public async save(data: PosteAudiosSubmit) {
    try {
      const promise = await database.createDocument(
        this.databaseId,
        this.CollectionName,
        ID.unique(),
        data
      );
      return Promise.resolve(promise);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  /**
   * Enregistrer la  audios en fonction d'un postes
   * @param post_id
   * @returns
   */
  public async update(data: any) {
    try {
      const promise = await database.updateDocument(
        this.databaseId,
        this.CollectionName,
        data.id,
        data.dataToUpdate
      );
      return Promise.resolve(promise);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  /**
   * Enregistrer la  audios en fonction d'un postes
   * @param post_id
   * @returns
   */
  public async delete(id: any) {
    try {
      const promise = await database.deleteDocument(
        this.databaseId,
        this.CollectionName,
        id
      );
      return Promise.resolve(promise);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }
}
export default new PostesAudioServices();
