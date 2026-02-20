import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../models/admin.model.js";
import connectDB from "../config/db.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await Admin.findOne({ email: "admin@bnv.com" });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    await Admin.create({
      email: "admin@bnv.com",
      password: "admin123", // will auto hash
    });

    console.log("Admin seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};


seedAdmin();