import User from "../models/user.model.js";
import { Parser } from "json2csv";

// Create User
export const createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
};

// Get Users (Pagination + Search)
export const getUsers = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const search = req.query.search || "";

  const query = {
    $or: [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } }
    ]
  };

  const count = await User.countDocuments(query);

  const users = await User.find(query)
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({
    users,
    page,
    pages: Math.ceil(count / limit),
    total: count
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
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(user);
};

// Delete
export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

// Export CSV
export const exportCSV = async (req, res) => {
  const users = await User.find({});
  const parser = new Parser();
  const csv = parser.parse(users);

  res.header("Content-Type", "text/csv");
  res.attachment("users.csv");
  res.send(csv);
};