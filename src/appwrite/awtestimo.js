import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class TestimoServices {
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

  //   create testimonial
  async createTestimo({
    name,
    slug,
    state, 
    country,
    content,
    userimg,
    status,
  }) {
    try {
      return await this.databases.createDocument(
        config.appwriteTestimonialsDatabaseId,
        config.appwriteTestimonialsCollectionId,
        slug,
        {
          name,
          state, 
          country,
          content,
          userimg,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite Testimonial :: createTestimo :: error", error);
    }
  }

  //   updateDocument
  async updateTestimo(
    slug,
    { name, state, country, content, userimg, status }
  ) {
    try {
      return await this.databases.updateDocument(
        config.appwriteTestimonialsDatabaseId,
        config.appwriteTestimonialsCollectionId,
        slug,
        {
          name,
          state, 
          country,
          content,
          userimg,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite Testimonial :: updateTestimo :: error", error);
    }
  }

  //   deleteDocument
  async deleteTestimo(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteTestimonialsDatabaseId,
        config.appwriteTestimonialsCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite Testimonial :: deleteTestimo :: error", error);
      return false;
    }
  }

  // get single testimonial
  async getTestimo(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteTestimonialsDatabaseId,
        config.appwriteTestimonialsCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite Testimonial :: getTestimo :: error", error);
    }
    return false;
  }

  // get all testimonial
  async getAllTestimo(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteTestimonialsDatabaseId,
        config.appwriteTestimonialsCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite Testimonial :: getAllTestimo :: error", error);
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

const testimoServices = new TestimoServices();
export default testimoServices;