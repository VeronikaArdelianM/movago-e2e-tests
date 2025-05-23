import { Schema, model } from "mongoose"

const lessonSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 255,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        icon: {
            type: String,
            required: true,
            trim: true,
        },
        difficulty: {
            type: String,
            enum: ["beginner", "intermediate", "advanced"],
            required: true,
            index: true,
        },
        category: {
            type: String,
            enum: ["vocabulary", "grammar", "conversation", "reading", "listening"],
            default: "vocabulary",
            index: true,
        },
        order: {
            type: Number,
            default: 0,
            index: true,
        },
        questions: [
            {
                question: {
                    type: String,
                    required: true,
                    trim: true,
                },
                correctAnswer: {
                    type: Schema.Types.Mixed, // Can be string or array depending on question type
                    required: true,
                },
                options: [
                    {
                        type: Schema.Types.Mixed, // Can be string or object depending on question type
                        trim: true,
                    },
                ],
                hint: {
                    type: String,
                    trim: true,
                },
                type: {
                    type: String,
                    enum: ["multiple-choice", "translation", "matching", "word-order", "sentence-completion", "image-match"],
                    required: true,
                },
                media: {
                    type: String, // URL to image or audio file
                    trim: true,
                },
            },
        ],
        questionBank: [
            {
                question: {
                    type: String,
                    required: true,
                    trim: true,
                },
                correctAnswer: {
                    type: Schema.Types.Mixed, // Can be string or array depending on question type
                    required: true,
                },
                options: [
                    {
                        type: Schema.Types.Mixed, // Can be string or object depending on question type
                        trim: true,
                    },
                ],
                hint: {
                    type: String,
                    trim: true,
                },
                type: {
                    type: String,
                    enum: ["multiple-choice", "translation", "matching", "word-order", "sentence-completion", "image-match"],
                    required: true,
                },
                media: {
                    type: String, // URL to image or audio file
                    trim: true,
                },
            },
        ],
        questionsCount: {
            type: Number,
            default: 5,
            min: 1,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        completedCount: {
            type: Number,
            default: 0,
            index: true,
        },
        isPublished: {
            type: Boolean,
            default: true,
        },
        tags: [String],
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
)

export default model("Lesson", lessonSchema)