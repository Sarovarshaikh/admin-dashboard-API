const db = require("../models");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Field reuired!" });
  }
  const password_hash = await bcrypt.hash(password, 10);
  const user = await db.User.create({ name, email, password_hash, role });
  res.status(201).json(user);
};

exports.getUsers = async (req, res) => {
  const users = await db.User.findAll({
    attributes: { exclude: ["password_hash"] },
  });
  res.json(users);
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  console.log("userId===>", userId);

  if (!userId) {
    return res.status(400).json({ message: "User id required!" });
  }
  const user = await db.User.findByPk(userId, {
    attributes: { exclude: ["password_hash"] },
  });
  res.json(user);
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, role, password } = req.body;
  console.log("userId===>", userId);

  if (!userId || !name || !email || !role) {
    return res.status(400).json({ message: "Fields required!" });
  }

  const user = await db.User.findByPk(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = name;
  user.email = email;
  user.role = role;

  // password optional
  if (password) user.password_hash = await bcrypt.hash(password, 10);

  await user.save();
  res.json(user);
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({ message: "User id required!" });
  }
  await db.User.destroy({ where: { id: userId } });
  res.json({ message: "User deleted" });
};
