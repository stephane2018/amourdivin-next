import * as Appwrite from "appwrite";

const APPWRITE_URL = process.env.NEXT_PUBLIC_APPWRITE_URL || "";
const APPWRITE_PROJECT = process.env.NEXT_PUBLIC_APPWRITE_PROJECT || "";
const appwriteClient = new Appwrite.Client();
const account = new Appwrite.Account(appwriteClient);
const database = new Appwrite.Databases(appwriteClient);
const functions = new Appwrite.Functions(appwriteClient);
const storage = new Appwrite.Storage(appwriteClient);
const locale = new Appwrite.Locale(appwriteClient);
const query = new Appwrite.Query();

appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);

export {
  Appwrite,
  account,
  appwriteClient,
  database,
  functions,
  locale,
  query,
  storage,
};

export const Server = {
  endpoint: APPWRITE_URL,
  project: APPWRITE_PROJECT,
};
