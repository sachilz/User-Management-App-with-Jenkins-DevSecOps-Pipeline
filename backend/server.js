const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const mongoUrl = process.env.MONGODB_URL;
if (mongoUrl === undefined || mongoUrl === null || mongoUrl === '') {
  console.error("Missing MONGODB_URL in backend/.env. Database features will not work.");
} else {
  const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
  }
};

connectDB();
}

app.post("/user", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to create user" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to fetch users" });
  }
});

// ✏️ UPDATE user
app.put("/user/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,   // id from URL
      req.body,        // new data
      { new: true }    // return updated data
    );

    res.send(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to update user" });
  }
});

// DELETE
app.delete("/user/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send("User deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to delete user" });
  }
});

// 📦 Model
const Item = mongoose.model("Item", {
  name: String,
});

// ➕ POST API
app.post("/add", async (req, res) => {
  const item = new Item({ name: req.body.name });
  await item.save();
  res.send(item);
});

// 📥 GET API
app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

// 🚀 Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
