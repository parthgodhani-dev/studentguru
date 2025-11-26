const config = {
  appwriteEndpoint: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteTestimonialsDatabaseId: String(import.meta.env.VITE_APPWRITE_TESTIMONIALS_DATABASE_ID),
  appwriteTestimonialsCollectionId: String(import.meta.env.VITE_APPWRITE_TESTIMONIALS_COLLECTION_ID),
  appwriteBlogDatabaseId: String(import.meta.env.VITE_APPWRITE_BLOG_DATABASE_ID),
  appwriteBlogCollectionId: String(import.meta.env.VITE_APPWRITE_BLOG_COLLECTION_ID),

  appwriteMainCoursesDatabaseId: String(import.meta.env.VITE_APPWRITE_MAINCOURSES_DATABASE_ID),
  appwriteCoursesCollectionId: String(import.meta.env.VITE_APPWRITE_COURSES_COLLECTION_ID),
  appwriteSubCoursesCollectionId: String(import.meta.env.VITE_APPWRITE_SUBCOURSES_COLLECTION_ID),
  appwriteLessonsCollectionId: String(import.meta.env.VITE_APPWRITE_LESSONS_COLLECTION_ID),
  
  appwriteTeamDatabaseId: String(import.meta.env.VITE_APPWRITE_TEAM_DATABASE_ID),
  appwriteTeamCollectionId: String(import.meta.env.VITE_APPWRITE_TEAM_COLLECTION_ID)
};

export default config


