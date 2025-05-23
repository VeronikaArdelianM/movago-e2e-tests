import mongoose from "mongoose";
import Lesson from "./models/Lesson.js";
import lessonsData from "../data/lessonsData";

const MONGO_URI = "mongodb://localhost:27017/movago";

export async function seedLessons() {
    mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log("MongoDB connected")

        try {
            // Delete all existing lessons
            await Lesson.deleteMany({})
            console.log("Existing lessons deleted")

            // Insert new lessons from lessonsData.js
            await Lesson.insertMany(lessonsData)
            console.log("Lessons seeded successfully")
        } catch (error) {
            console.error("Error seeding lessons:", error)
        } finally {
            await mongoose.disconnect()
            console.log("MongoDB disconnected")
        }
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err)
    })
}