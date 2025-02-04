import mongoose from "mongoose";

const leadActivitySchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    feedbacks: [
      {
        createdAt: {
          type: String,
          default: () =>
            new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
        },
        feedback: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const LeadActivity = mongoose.model("LeadActivity", leadActivitySchema);
export default LeadActivity;
