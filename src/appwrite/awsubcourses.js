import config from "../config/config";
import { Client, ID, Databases, Query } from "appwrite";
import lessonsServices from "./awlessons";

export class SubCourseServices {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(config.appwriteEndpoint)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  // CREATE SUB COURSE
  async createSubcourse({ courseid, subtitle }) {
    try {
      return await this.databases.createDocument(
        config.appwriteMainCoursesDatabaseId,
        config.appwriteSubCoursesCollectionId,
        ID.unique(),
        { courseid, subtitle }
      );
    } catch (error) {
      console.log("Appwrite SubCourse :: createSubcourse :: error", error);
      return false;
    }
  }

  // UPDATE
  async updateSubcourse(id, data) {
    try {
      return await this.databases.updateDocument(
        config.appwriteMainCoursesDatabaseId,
        config.appwriteSubCoursesCollectionId,
        id,
        data
      );
    } catch (error) {
      console.log("Appwrite SubCourse :: updateSubcourse :: error", error);
      return false;
    }
  }

  // DELETE SINGLE SUBCOURSE (with lessons) — UPDATED
  async deleteSubcourse(id) {
    try {
      
      await lessonsServices.deleteLessonsBySubcourse(id);

      
      return await this.databases.deleteDocument(
        config.appwriteMainCoursesDatabaseId,
        config.appwriteSubCoursesCollectionId,
        id
      );
    } catch (error) {
      console.log("Appwrite SubCourse :: deleteSubcourse :: error", error);
      return false;
    }
  }

  // DELETE ALL SUBCOURSES OF COURSE (NEW)
  async deleteSubcoursesByCourse(courseid) {
    try {
      const subs = await this.getSubcourses(courseid);

      if (!subs?.documents) return true;

      for (const sub of subs.documents) {
        await this.deleteSubcourse(sub.$id);
      }

      return true;
    } catch (error) {
      console.log(
        "Appwrite SubCourse :: deleteSubcoursesByCourse :: error",
        error
      );
      return false;
    }
  }

  async getAllSubcourses() {
    try {
      const res = await this.databases.listDocuments(
        config.appwriteMainCoursesDatabaseId,
        config.appwriteSubCoursesCollectionId
      );

      return {
        total: res.total,
        subcourses: res.documents,
      };
    } catch (error) {
      console.log("Appwrite SubCourse :: getAllSubcourses :: error", error);
      return {
        total: 0,
        subcourses: [],
      };
    }
  }

  // GET ALL BY COURSE
  async getSubcourses(courseid) {
    try {
      return await this.databases.listDocuments(
        config.appwriteMainCoursesDatabaseId,
        config.appwriteSubCoursesCollectionId,
        [Query.equal("courseid", courseid)]
      );
    } catch (error) {
      console.log("Appwrite SubCourse :: getSubcourses :: error", error);
      return false;
    }
  }

  // GET SINGLE
  async getSubcourse(id) {
    try {
      return await this.databases.getDocument(
        config.appwriteMainCoursesDatabaseId,
        config.appwriteSubCoursesCollectionId,
        id
      );
    } catch (error) {
      console.log("Appwrite SubCourse :: getSubcourse :: error", error);
      return false;
    }
  }
}

const subCourseServices = new SubCourseServices();
export default subCourseServices;
