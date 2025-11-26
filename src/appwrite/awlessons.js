import config from "../config/config";
import { Client, ID, Databases, Query } from "appwrite";

export class LessonsServices {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(config.appwriteEndpoint)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  // CREATE LESSON
  async createLesson({ subcourseid, lessontitle, lessonvideo }) {
    try {
      return await this.databases.createDocument(
        config.appwriteMainCoursesDatabaseId,
        config.appwriteLessonsCollectionId,
        ID.unique(),
        { subcourseid, lessontitle, lessonvideo }
      );
    } catch (error) {
      console.log("Appwrite Lesson :: createLesson :: error", error);
      return false;
    }
  }

  // UPDATE
  async updateLesson(id, data) {
    try {
      return await this.databases.updateDocument(
        config.appwriteMainCoursesDatabaseId,
        config.appwriteLessonsCollectionId,
        id,
        data
      );
    } catch (error) {
      console.log("Appwrite Lesson :: updateLesson :: error", error);
      return false;
    }
  }

  // DELETE SINGLE LESSON
  async deleteLesson(id) {
    try {
      return await this.databases.deleteDocument(
        config.appwriteMainCoursesDatabaseId,
        config.appwriteLessonsCollectionId,
        id
      );
    } catch (error) {
      console.log("Appwrite Lesson :: deleteLesson :: error", error);
      return false;
    }
  }

  // DELETE ALL LESSONS OF SINGLE SUBCOURSE (NEW)
  async deleteLessonsBySubcourse(subcourseid) {
    try {
      const lessonList = await this.getLessons(subcourseid);

      if (!lessonList?.documents) return true;

      for (const lesson of lessonList.documents) {
        await this.deleteLesson(lesson.$id);
      }

      return true;
    } catch (error) {
      console.log(
        "Appwrite Lesson :: deleteLessonsBySubcourse :: error",
        error
      );
      return false;
    }
  }

  async getAllLessonsCount(data) {
    try {
      return await this.databases.listDocuments(
        config.appwriteMainCoursesDatabaseId,
        config.appwriteLessonsCollectionId,
        data
      );
      
    } catch (error) {
      console.log("Appwrite Lesson :: getAllLessonsCount :: error", error);
      return false;
    }
  }

  // GET LESSONS BY SUBCOURSE
  async getLessons(subcourseid) {
    try {
      return await this.databases.listDocuments(
        config.appwriteMainCoursesDatabaseId,
        config.appwriteLessonsCollectionId,
        [Query.equal("subcourseid", subcourseid)]
      );
    } catch (error) {
      console.log("Appwrite Lesson :: getLessons :: error", error);
      return false;
    }
  }

  // GET SINGLE
  async getLesson(id) {
    try {
      return await this.databases.getDocument(
        config.appwriteMainCoursesDatabaseId,
        config.appwriteLessonsCollectionId,
        id
      );
    } catch (error) {
      console.log("Appwrite Lesson :: getLesson :: error", error);
      return false;
    }
  }
}



const lessonsServices = new LessonsServices();
export default lessonsServices;
