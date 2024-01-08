import { ID, Query } from "appwrite";
import { account, database } from "../config/AppwriteConfig";
import config from "../config/constantes";
import {
  ILogin,
  IRegister,
  IRegisterUserInfos,
  IUserModels,
} from "../interfaces/user.interface";

class UserService {
  private databaseId: string;

  private CollectionName: string;

  constructor() {
    this.CollectionName = config.collectionNames.users;
    this.databaseId = config.DatabaseUrl;
  }

  public checkIfUserIsConnected = () => {
    let isConnected = false;
    account.get().then((c) => {
      isConnected = true;
    });
    return isConnected;
  };

  public async login(data: ILogin) {
    try {
      return Promise.resolve(
        account.createEmailSession(data.email, data.password)
      );
    } catch (error: any) {
      return Promise.reject(error);
    }
  }
  /**
   * register user
   */
  public async registerUser(data: IRegister) {
    try {
      const state = -1;
      await account
        .create(ID.unique(), data.email, data.password, data.username)
        .then(async (c) => {
          const user: IRegisterUserInfos = {
            about_me: "",
            balance: "0",
            avatar: "",
            email: data.email,
            password: data.password,
            created_at: Date.now().toString(),
            email_status: "0",
            id: c.$id,
            last_seen: Date.now().toString(),
            reward_system_enabled: "0",
            show_email_on_profile: "0",
            show_rss_feeds: "0",
            slug: data.username.split(" ").join("-"),
            username: data.username,
            token: "",
            user_type: "registered",
            facebook_id: null,
            facebook_url: null,
            google_id: null,
            instagram_url: null,
            linkedin_url: null,
            pinterest_url: null,
            telegram_url: null,
            twitter_url: String,
            vk_id: null,
            vk_url: String,
            youtube_url: null,
            status: 1,
            role: "user",
            total_pageviews: "0",
            site_color: "",
            site_mode: "light",
          };
          await database
            .createDocument(
              this.databaseId,
              this.CollectionName,
              "unique()",
              user
            )
            .catch((err) => {
              // console.log(err);
            });
        });
      return "ok";
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  /**
   * getCUrrentUser
   */
  public getSessionUser() {
    try {
      const promise = account.get();

      return Promise.resolve(promise);
    } catch (error: any) {
      // console.log(error);
      return Promise.reject(error);
    }
  }

  /**
   * getCUrrentUser
   */
  public async getSessionLogout() {
    try {
      localStorage.clear();
      return await account.getSession("current").then(async (currentUser) => {
        account.deleteSession(currentUser.$id);
      });
    } catch (error: any) {
      // console.log(error);
      return Promise.reject(error);
    }
  }

  /**
   * getCUrrentUser
   */
  public async getCurrentUser() {
    try {
      const promise = await account.get();
      const currentUser = await this.GetUserByEmail(promise.email);
      return Promise.resolve(currentUser);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  /**
   *  recuperer  un utilsiateurs en fonction de sont id
   * @param post_id
   * @returns
   */
  public async GetUserById(id: string | false) {
    try {
      const result = await database.listDocuments<IUserModels>(
        this.databaseId,
        this.CollectionName,
        [Query.equal("id", id), Query.orderDesc("created_at")]
      );
      return Promise.resolve(result);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  /**
   *  recuperer les infornations de l'utilisateur en fonction de sont identifiant
   * @param id
   * @returns
   */
  public async CheckIfEmailExists(id: string | false) {
    try {
      const result = await database.listDocuments<IUserModels>(
        this.databaseId,
        this.CollectionName,
        [Query.equal("email", id), Query.orderDesc("created_at")]
      );
      return result;
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  /**
   *  recuperer les infornations d'un utlisateteur en function de sont email
   * @param id
   * @returns
   */
  public async GetUserByEmail(id: string) {
    // console.log(id);
    try {
      const result = await database.listDocuments<IUserModels>(
        this.databaseId,
        this.CollectionName,
        [Query.equal("email", id)]
      );
      return Promise.resolve(result.documents[0]);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  /**
   * getUserList
   */
  public async getUserList() {
    try {
      const result = await database.listDocuments<IUserModels>(
        this.databaseId,
        this.CollectionName
      );

      return result;
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  /**
   * GetIpAdresse
   */
  public async GetIpAdresse() {
    try {
      const result = await fetch("https://api.ipify.org?format=json");
      return Promise.resolve(result.json());
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
export default new UserService();
