import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class TeamServices {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteEndpoint)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  //   create Expertteam
  async createTeam({
    name,
    slug,
    designation, 
    experience,
    expertise,
    bio,
    expertimg,
    status,
  }) {
    try {
      return await this.databases.createDocument(
        config.appwriteTeamDatabaseId,
        config.appwriteTeamCollectionId,
        slug,
        {
          name,
          designation,
          experience,
          expertise,
          bio,
          expertimg,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite Expertteam :: createTeam :: error", error);
    }
  }

  //   updateDocument
  async updateTeam(
    slug,
    { name, designation, experience, expertise,bio, expertimg, status }
  ) {
    try {
      return await this.databases.updateDocument(
        config.appwriteTeamDatabaseId,
        config.appwriteTeamCollectionId,
        slug,
        {
          name,
          designation, 
          experience,
          expertise,
          bio,
          expertimg,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite Expertteam :: updateTeam :: error", error);
    }
  }

  //   deleteDocument
  async deleteTeam(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteTeamDatabaseId,
        config.appwriteTeamCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite Expertteam :: deleteTeam :: error", error);
      return false;
    }
  }

  // get single Expertteam
  async getTeam(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteTeamDatabaseId,
        config.appwriteTeamCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite Expertteam :: getTeam :: error", error);
    }
    return false;
  }

  // get all Expertteam
  async getAllTeam(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteTeamDatabaseId,
        config.appwriteTeamCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite Expertteam :: getAllTeam :: error", error);
      return false;
    }
  }

  // file upload service
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFileView(config.appwriteBucketId, fileId);
  }
}

const teamServices = new TeamServices();
export default teamServices;