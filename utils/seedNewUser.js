import mongoose from "mongoose";
import { hash } from "bcrypt";
import User from "./models/User.js";
import Lesson from "./models/Lesson.js";
import { testData } from "../data/testData.js";

export async function seedNewUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
    // Check if the user already exists
    const existing = await User.findOne({ email: testData.existentUser.email });
    const existing2 = await User.findOne({ email: testData.newUser.email });
    if (existing) {
      console.log("⚠️ Regular user already exists. Replacing...");
      await User.deleteOne({ _id: existing._id });
    }
    if (existing2) {
      console.log("⚠️ Second regular user already exists. Deleting...");
      await User.deleteOne({ _id: existing2._id });
    }

    const hashedPassword = await hash(testData.existentUser.password, 10);

    const now = new Date();
    const yesterday = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() - 1,
      0, 0, 0, 0
    ));

    const lesson = await Lesson.findOne({ title: "Привітання" });
    if (!lesson) {
      throw new Error("❌ 'Привітання' lesson not found.");
    }
    const lessonId = lesson._id.toString();

    const regularUser = new User({
      username: testData.existentUser.username,
      email: testData.existentUser.email,
      password: hashedPassword,
      role: "user",
      status: "pending",
      progress: {
        completedLessons: [lessonId],
        xp: 20,
        level: 1,
        streakDays: 1,
        activityCalendar: [
          {
            date: yesterday,
            completed: true
          }
        ],
        lessonCompletionCounts: {
          [lessonId]: 1
        }
      }
    });

    await regularUser.save();
    console.log("✅ Regular user with 1 completed lesson seeded.");
  } catch (error) {
    console.error("❌ Failed to seed regular user:", error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  }
}