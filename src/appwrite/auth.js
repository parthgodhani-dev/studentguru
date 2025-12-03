import config from "../config/config";
import { Client, Account, ID, Databases } from "appwrite";

export class Authservice {
  client = new Client();
  account;
  databases;

  constructor() {
    this.client
      .setEndpoint(config.appwriteEndpoint)
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
  }

  // Register new user
  async createAccount({ name, email, password, phone, dob }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      await this.account.createEmailPasswordSession(email, password);

      await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        userAccount.$id,
        {
          userId: userAccount.$id,
          phone,
          dob: new Date(dob).toISOString(),
          role: "user",
        }
      );

      const user = await this.account.get();
      return user;
    } catch (error) {
      console.error("❌ createAccount error:", error);
      throw error;
    }
  }

  // Login
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("Appwrite Auth :: login :: error", error);
      throw error;
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      const authUser = await this.account.get();

      if (!authUser) return null;

      const profile = await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        authUser.$id
      );

      return {
        $id: authUser.$id,
        name: authUser.name,
        email: authUser.email,
        phone: profile.phone || null,
        dob: profile.dob || null,
        role: profile.role || "user",
      };
    } catch (error) {
      console.error("Appwrite Auth :: getCurrentUser :: error", error);
      return null;
    }
  }

  // logout
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite Auth :: logout :: error", error);
      throw error;
    }
  }

  async changePassword(oldPassword, newPassword) {
    try {
      return await this.account.updatePassword(newPassword, oldPassword);
    } catch (error) {
      console.log("Appwrite Auth :: changePassword :: error", error);
      throw error;
    }
  }
}

const authService = new Authservice();
export default authService;
