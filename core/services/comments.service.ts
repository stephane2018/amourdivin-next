import { Query } from "appwrite";
import { database } from "../config/AppwriteConfig";
import config from "../config/constantes";
import {
  ICommentaire,
  ICommentaires,
} from "../interfaces/commentaires.settings";

class CommentServices {
  private databaseId: string;

  private CollectionName: string;

  constructor() {
    this.CollectionName = config.collectionNames.comments;
    this.databaseId = config.DatabaseUrl;
  }

  /**
   * Save comment
   */

  public async save(Commentaire: any) {
    try {
      const result = await database.createDocument(
        this.databaseId,
        this.CollectionName,
        "unique()",
        Commentaire
      );
      return Promise.resolve(result);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  /**
   * Save comment
   */

  // public async GetCommentLikeById(comment_id: any) {
  //   try {
  //     const result = await database.listDocuments<ICommentaireLikes>(
  //       this.databaseId,
  //       this.CollectionName,
  //       [Query.equal("comment_id", comment_id), Query.limit(1)]
  //     );
  //     return Promise.resolve(result);
  //   } catch (error: any) {
  //     toast.error(error.message);
  //     return Promise.reject(error);
  //   }
  // }

  /**
   *
   */
  public async CommentsOfOnePostes(id: string) {
    try {
      const result = await database.listDocuments<ICommentaires>(
        this.databaseId,
        this.CollectionName,
        [Query.equal("post_id", id), Query.orderDesc("created_at")]
      );

      return Promise.resolve(result);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  // /**
  //  * GetSubComment
  //  * @param id
  //  * @returns
  //  */
  // public async GetSubComment(id: string) {
  //   try {
  //     const result = await database.listDocuments<CommentairesModels>(
  //       this.databaseId,
  //       this.CollectionName,
  //       [Query.equal("post_id", [id]), Query.orderDesc("created_at")]
  //     );
  //     return Promise.resolve(result);
  //   } catch (error: any) {
  //     toast.error(error.message);
  //     return Promise.reject(error);
  //   }
  // }

  // public async deleteComment(id: string) {
  //   try {
  //     const result = await database.deleteDocument(
  //       this.databaseId,
  //       this.CollectionName,
  //       id
  //     );

  //     return Promise.resolve(result);
  //   } catch (error: any) {
  //     toast.error(error.message);
  //     return Promise.reject(error);
  //   }
  // }

  public async get(id: string) {
    try {
      const result = await database.deleteDocument(
        this.databaseId,
        this.CollectionName,
        id
      );

      return Promise.resolve(result);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  public async GetComentaireItem() {
    try {
      const result = await database.listDocuments<ICommentaires>(
        this.databaseId,
        this.CollectionName,
        [Query.limit(1), Query.orderDesc("created_at")]
      );

      return Promise.resolve(result);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }
}
const CommentaireService = new CommentServices();
export default CommentaireService;
