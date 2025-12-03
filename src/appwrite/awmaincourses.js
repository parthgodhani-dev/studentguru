import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

import subCourseServices from "./awsubcourses";
import lessonsServices from "./awlessons";

export class MainCoursesServices {
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

  // CREATE MAIN COURSE
  async createCourse({
    coursetitle,
    slug,
    description,
    courseimg,
    briefinfo,
    status,
  }) {
    try {
      return await this.databases.createDocument(
        config.appwriteMainCoursesDatabaseId,
        config.appwriteCoursesCollectionId,
        slug,
        {
          coursetitle,
          description,
          courseimg,
          briefinfo,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite MainCourses :: createCourse :: error", error);
    }
  }

  // UPDATE MAIN COURSE
  async updateCourse(
    slug,
    { coursetitle, description, courseimg, briefinfo, status }
  ) {
    try {
      return await this.databases.updateDocument(
        config.appwriteMainCoursesDatabaseId,
        config.appwriteCoursesCollectionId,
        slug,
        {
          coursetitle,
          description,
          courseimg,
          briefinfo,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite MainCourses :: updateCourse :: error", error);
    }
  }

  
  // CASCADE DELETE MAIN COURSE
  async deleteCourse(slug) {
    try {
  
      const subcourses = await subCourseServices.getSubcourses(slug);

      if (subcourses?.documents) {
  
        for (const sub of subcourses.documents) {
  
          await lessonsServices.deleteLessonsBySubcourse(sub.$id);

  
          await subCourseServices.deleteSubcourse(sub.$id);
        }
      }

  
      await this.databases.deleteDocument(
        config.appwriteMainCoursesDatabaseId,
        config.appwriteCoursesCollectionId,
        slug
      );

      return true;
    } catch (error) {
      console.log("Appwrite MainCourses :: deleteCourse :: error", error);
      return false;
    }
  }

  // GET SINGLE COURSE
  async getCourse(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteMainCoursesDatabaseId,
        config.appwriteCoursesCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite MainCourses :: getCourse :: error", error);
    }
    return false;
  }

  // GET ALL
  async getAllCourses(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteMainCoursesDatabaseId,
        config.appwriteCoursesCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite MainCourses :: getAllCourses :: error", error);
      return false;
    }
  }

  // FILE UPLOAD
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite MainCourses :: uploadFile :: error", error);
      return false;
    }
  }

  // DELETE FILE
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

  // FILE PREVIEW
  getFilePreview(fileId) {
    return this.bucket.getFileView(config.appwriteBucketId, fileId);
  }
}

const maincoursesServices = new MainCoursesServices();
export default maincoursesServices;
