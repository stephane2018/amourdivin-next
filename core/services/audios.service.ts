import { ID, Query } from "appwrite";
import { toast } from "sonner";
import config from "../config/constantes";
import generiqueService from "./generique.service";
import { database } from "../config/AppwriteConfig";
import { AudiosModels, AudiosSubmit } from "../interfaces/Audios";

class AudioServices {
  private databaseId: string;

  private CollectionName: string;

  constructor() {
    this.CollectionName = config.collectionNames.audios;
    this.databaseId = config.DatabaseUrl;
  }

  /**
   *  récuperer la listes des audios pout un postes
   * @param post_id
   * @returns
   */
  public async getlastSave() {
    try {
      const result = await generiqueService.GetLasteElement<AudiosModels>(
        this.CollectionName,
        [Query.limit(1), Query.orderDesc("$createdAt")]
      );
      return Promise.resolve(result);
    } catch (error: any) {
      toast.error(error.message);
      return Promise.reject(error);
    }
  }

  /**
   *  récuperer la listes des audios pout un postes
   * @param post_id
   * @returns
   */
  public async getlastElement(post_id: string) {
    try {
      const result = await generiqueService.GetLasteElement<AudiosModels>(
        this.CollectionName,
        [Query.equal("post_id", post_id)]
      );
      return Promise.resolve(result);
    } catch (error: any) {
      toast.error(error.message);
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
      const promise = await database.listDocuments<AudiosModels>(
        this.databaseId,
        this.CollectionName,
        [Query.equal("post_id", Number(post_id))]
      );
      return Promise.resolve(promise);
    } catch (error: any) {
      toast.error(error.message);
      return Promise.reject(error);
    }
  }

  /**
   * Enregistrer la  audios en fonction d'un postes
   * @param post_id
   * @returns
   */
  public async save(data: AudiosSubmit) {
    try {
      const promise = await database.createDocument(
        this.databaseId,
        this.CollectionName,
        ID.unique(),
        data
      );
      return Promise.resolve(promise);
    } catch (error: any) {
      toast.error(error.message);
      return Promise.reject(error);
    }
  }

  /**
   * Delete audios
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
      toast.error(error.message);
      return Promise.reject(error);
    }
  }

  /**
   *  récuperer la listes des audios par rapport a un postes
   * @param post_id
   * @returns
   */
  public async getAudiosListPerPostById(post_id: string) {
    try {
      const audiosList = await database.listDocuments<AudiosModels>(
        this.databaseId,
        this.CollectionName,
        [Query.equal("id", Number(post_id))]
      );
      return Promise.resolve(audiosList);
    } catch (error: any) {
      toast.error(error.message);
      return Promise.reject(error);
    }
  }
}
export default new AudioServices();
