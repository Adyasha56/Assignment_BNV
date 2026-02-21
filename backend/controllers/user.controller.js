import User from "../models/User.js";
import { Parser } from "json2csv";
import cloudinary from "../config/cloudinary.js";

// Create User


export const createUser = async (req, res) => {
  let imageUrl = "";

  if (req.file) {
    const result = await cloudinary.uploader.upload_stream(
      { folder: "user_management" },
      (error, result) => {
        if (error) throw error;
        return result;
      }
    );
  }

  if (req.file) {
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "user_management" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    imageUrl = uploadResult.secure_url;
  }

  const user = await User.create({
    ...req.body,
    profileImage: imageUrl,
  });

  res.status(201).json({
    success: true,
    data: user,
  });
};

// Get Users (Pagination + Search)
export const getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const search = req.query.search || "";
  const gender = req.query.gender;
  const status = req.query.status;
  const sort = req.query.sort || "-createdAt";

  const query = {};

  // Search (firstName, lastName, email)
  if (search) {
    query.$or = [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  // Filters
  if (gender) {
    query.gender = gender;
  }

  if (status) {
    query.status = status;
  }

  const total = await User.countDocuments(query);

  const users = await User.find(query)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit);

  res.status(200).json({
    success: true,
    data: users,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1,
    },
  });
};

// Get Single User
export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

// Update
export const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (req.file) {
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "user_management" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    user.profileImage = uploadResult.secure_url;
  }

  Object.assign(user, req.body);

  const updatedUser = await user.save();

  res.json({
    success: true,
    data: updatedUser,
  });
};

// Delete
export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

// Export CSV
export const exportCSV = async (req, res) => {
  try {
    const users = await User.find({});

    // Define fields to export in desired order
    const fields = [
      { label: "First Name", value: "firstName" },
      { label: "Last Name", value: "lastName" },
      { label: "Email", value: "email" },
      { label: "Mobile", value: "mobile" },
      { label: "Gender", value: "gender" },
      { label: "Location", value: "location" },
      { label: "Status", value: "status" },
      { label: "Image URL", value: "profileImage" },
      { label: "Created Date", value: "createdAt" },
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(users);

    res.header("Content-Type", "text/csv; charset=utf-8");
    res.header("Content-Disposition", "attachment; filename=users.csv");
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: "Error exporting users", error: error.message });
  }
};