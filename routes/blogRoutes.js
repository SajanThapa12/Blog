const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Blog = require("../model/Blog");
const multer = require("multer");
const multerUploads = require("../middleware/multer");


router.post("/", multerUploads.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file;
    console.log(image);

    const newBlogPost = new Blog({
      title,
      description,
      image: `${image.destination}${image.filename}`,
    });
    await newBlogPost.save();
    res.status(201).json(newBlogPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/blog", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newBlogPost = new Blog({
      title,
      description,
    });
    await newBlogPost.save();
    res.status(201).json(newBlogPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const blogPosts = await Blog.find();
    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blogPost = await Blog.findone(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ message: "Blog port not found" });
    }
    res.status(200).json(blogPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatedBlogPost = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );
    if (!updatedBlogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.status(200).json(updatedBlogPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedBlogPost = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
