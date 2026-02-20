import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "7d", // auto delete after 7 days
  },
});

export default mongoose.model("BlacklistedToken", tokenSchema);