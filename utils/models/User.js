import { Schema, model } from "mongoose"
import { isEmail } from "validator"

const userSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
        index: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true,
        validate: {
          validator: isEmail,
          message: "Invalid email address",
        },
      },
      password: {
        type: String,
        required: true,
        minlength: 8,
      },
      description: {
        type: String,
        trim: true,
      },
      profilePhoto: {
        type: String,
        default: "",
      },
      status: {
        type: String,
        enum: ["active", "inactive", "pending"],
        default: "pending",
      },
      role: {
        type: String,
        enum: ["user", "admin", "moderator"],
        default: "user",
      },
      progress: {
        completedLessons: [
          {
            type: Schema.Types.ObjectId,
            ref: "Lesson",
          },
        ],
        lessonCompletionCounts: {
          type: Object,
          of: Number,
          default: {},
        },
        xp: {
          type: Number,
          default: 0,
        },
        level: {
          type: Number,
          default: 1,
        },
        streakDays: {
          type: Number,
          default: 0,
        },
        activityCalendar: [
          {
            date: Date,
            completed: Boolean,
          },
        ],
      },
    },
    {
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    },
)

export default model("User", userSchema)
