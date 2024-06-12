const mongoose = require("mongoose");
const User = require("./model/User");
const express = require("express");
const bodyParser = require("body-parser");
const Blog = require("./model/Blog");
const connectDB = require("./conifg/db");
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
app.use("/api/blogs", blogRoutes);
app.use("/auth", authRoutes);

// app.get("/", (req, res) => {
//   res.send("Hello Blog");
// });

// app.get("/register", async (req, res) => {
//   res.render("register");
// });

// app.get("/login", async (req, res) => {
//   res.render("login");
// });

// app.post("/register", async (req, res) => {
//   const { username, email, password } = req.body;

//   if (existingUSer) {
//     return res.status(400).json({ error: "Username already exist" });
//   }

//   const newUser = new User({ username, email, password });
//   await newUser.save();
//   res.status(201).json({ message: "Registration successfully." });
// });

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.find({ username });
//   if (!user) {
//     return res.status(401).json({ error: " Invalid username or password." });
//   }

//   if (!password == user.password) {
//     return res.status(401).json({ error: "Invalid username or password." });
//   }
//   res.json({ message: "Login sucessful", user });
// });

// app.post("/blog", async (req, res) => {
//   console.log(req.body);
//   const { title, description, created_at, updated_at } = req.body;

//   if (!title || !description) {
//     return res.status.json({ error: "Title and description are required" });
//   }

//   try {
//     const newBlogPost = await Blog.create({
//       title,
//       description,
//       created_at,
//       updated_at,
//     });
//     res.status(201).json(newBlogPost);
//   } catch (error) {
//     console.error("Error creating blog post:", error);
//     res.status(500).json({ error: "Failed to create blog post" });
//   }
// });

// app.patch("/blog/:id", async (req, res) => {
//   const { id } = req.params;
//   const { title, description } = req.body;

//   try {
//     const blog = await Blog.findById();
//     if (!blog) {
//       return res.status(404).json({ error: "Blog not found" });
//     }
//     if (req.body.title !== undefined) {
//       blog.title = req.body.title;
//     }
//     if (req.body.description != undefined)
//       blog.description = req.body.description;
//     await blog.save();
//     return res.json(blog);
//   } catch (error) {
//     console.error("Error update blog", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.delete("/blog/:id", async (req, res) => {
//   const removeBlog = await Blog.findByIdAndDelete({ _id: req.params.id });
//   res.json(removeBlog);
// });

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
