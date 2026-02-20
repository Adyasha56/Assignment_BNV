import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    profileImage: { type: String },
    location: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);