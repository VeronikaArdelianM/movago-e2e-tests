import mongoose from "mongoose";
import { hash } from "bcrypt";
import User from "../utils/models/User.js";
import dotenv from "dotenv";

export async function seedAdminUser() {
  await mongoose.connect(process.env.MONGODB_URI);

  const existing = await User.findOne({ email: "admin@example.com" });
  if (existing) {
    console.log("⚠️ Admin user already exists. Replacing...");
    await User.deleteOne({ _id: existing._id });
  }

  const hashedPassword = await hash("Test123!", 10);

  const now = new Date();
  const yesterday = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() - 1, // subtract one day
    0, 0, 0, 0            // midnight UTC
  ));

  const lessonId = new mongoose.Types.ObjectId("6830845151007140d4cfab3f"); // ensure valid ObjectId

  const adminUser = new User({
    username: "admin",
    email: "admin@example.com",
    password: hashedPassword,
    role: "admin",
    status: "active",
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
        [lessonId.toString()]: 1
      }
    }
  });

  try {
    await adminUser.save();
    console.log("✅ Admin user with 1 completed lesson seeded.");
  } catch (err) {
    console.error("❌ Failed to seed admin user:", err);
  } finally {
    await mongoose.disconnect();
  }
}

