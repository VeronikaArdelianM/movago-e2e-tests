import mongoose from "mongoose";
import Lesson from "./models/Lesson.js";
import lessonsData from "../data/lessonsData";

export async function seedLessons() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    await Lesson.deleteMany({});
    console.log("Existing lessons deleted");

    await Lesson.insertMany(lessonsData);
    console.log("Lessons seeded successfully");
  } catch (error) {
    console.error("Error seeding lessons:", error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  }
}
