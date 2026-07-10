const express = require("express");

const {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost
} = require("../controllers/postController");

const validatePost = require("../middleware/validatePost");

const router = express.Router();

// Create a new blog post
router.post("/", validatePost, createPost);

// Get all blog posts
router.get("/", getAllPosts);

// Get a single blog post by ID
router.get("/:id", getSinglePost);

// Update a blog post by ID
router.put("/:id", validatePost, updatePost);

// Delete a blog post by ID
router.delete("/:id", deletePost);

module.exports = router;