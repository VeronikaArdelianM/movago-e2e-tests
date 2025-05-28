import mongoose from "mongoose";
import { hash } from "bcrypt";
import User from "./models/User.js";
import { testData } from "../data/testData.js";

export async function seedAdminUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    const existing = await User.findOne({ email: testData.adminUser.email });
    // Check if an admin user already exists
    if (existing) {
      console.log("⚠️ Admin user already exists. Replacing...");
      await User.deleteOne({ _id: existing._id });
    }

    const hashedPassword = await hash(testData.adminUser.password, 10);

    const adminUser = new User({
      username: testData.adminUser.username,
      email: testData.adminUser.email,
      password: hashedPassword,
      role: "admin",
      status: "active"
    });

    await adminUser.save();
    console.log("✅ Admin user seeded.");
  } catch (error) {
    console.error("❌ Failed to seed admin user:", error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  }
}


