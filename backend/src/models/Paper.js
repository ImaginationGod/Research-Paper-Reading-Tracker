import mongoose from "mongoose";

const paperSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },

        domain: {
            type: String,
            enum: [
                "Computer Science",
                "Biology",
                "Physics",
                "Chemistry",
                "Mathematics",
                "Social Sciences",
            ],
            required: true,
        },

        stage: {
            type: String,
            enum: [
                "Abstract Read",
                "Introduction Done",
                "Methodology Done",
                "Results Analyzed",
                "Fully Read",
                "Notes Completed",
            ],
            required: true,
        },

        citations: { type: Number, default: 0 },

        impact: {
            type: String,
            enum: ["High Impact", "Medium Impact", "Low Impact", "Unknown"],
            required: true,
        },

        dateAdded: { type: Date, required: true },
    },
    { timestamps: true }
);

export default mongoose.model("Paper", paperSchema);
