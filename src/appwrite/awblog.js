import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class BlogServices {
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

  //   create Blogs
  async createBlog({
    title,
    slug,
    shortcontent,
    tags,
    content,
    featuredimage,
    status,
  }) {
    try {
      const cleanSlug = slug
        .toLowerCase()
        .replace(/[^a-z0-9-_\.]/g, "-")
        .replace(/^-+/, "")
        .slice(0, 36);

      return await this.databases.createDocument(
        config.appwriteBlogDatabaseId,
        config.appwriteBlogCollectionId,
        cleanSlug,
        {
          title,
          shortcontent,
          content,
          tags,
          featuredimage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite Blog :: createBlog :: error", error);
    }
  }

  //   updateDocument
  async updateBlog(
    slug,
    { title, shortcontent, content, tags, featuredimage, status }
  ) {
    try {
      const cleanSlug = slug
        .toLowerCase()
        .replace(/[^a-z0-9-_\.]/g, "-")
        .replace(/^-+/, "")
        .slice(0, 36);

      return await this.databases.updateDocument(
        config.appwriteBlogDatabaseId,
        config.appwriteBlogCollectionId,
        cleanSlug,
        {
          title,
          shortcontent,
          content,
          tags,
          featuredimage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite Blog :: updateBlog :: error", error);
    }
  }

  //   deleteDocument
  async deleteBlog(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteBlogDatabaseId,
        config.appwriteBlogCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite Blog :: deleteBlog :: error", error);
      return false;
    }
  }

  // get single blog
  async getBlog(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteBlogDatabaseId,
        config.appwriteBlogCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite Blog :: getBlog :: error", error);
    }
    return false;
  }

  // get all blogs
  async getAllBlogs(
    order = "desc",
    queries = [Query.equal("status", "active")]
  ) {
    try {
      const sortQuery =
        order === "asc"
          ? Query.orderAsc("$createdAt")
          : Query.orderDesc("$createdAt");

      const finalQueries = [...queries, sortQuery];

      return await this.databases.listDocuments(
        config.appwriteBlogDatabaseId,
        config.appwriteBlogCollectionId,
        finalQueries
      );
    } catch (error) {
      console.log("Appwrite Blog :: getAllBlogs :: error", error);
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

const blogServices = new BlogServices()
export default blogServices;