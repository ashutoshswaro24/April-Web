const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "../data/posts.json");

// Read posts from posts.json
const readPosts = () => {
  const data = fs.readFileSync(dataFilePath, "utf-8");
  return JSON.parse(data);
};

// Save posts to posts.json
const writePosts = (posts) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2));
};

// Create a new blog post
const createPost = (req, res) => {
  const { title, content, author, category } = req.body;

  const posts = readPosts();

  const newPost = {
    id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
    title,
    content,
    author,
    category,
    createdDate: new Date().toISOString()
  };

  posts.push(newPost);
  writePosts(posts);

  res.status(201).json({
    success: true,
    message: "Blog post created successfully",
    data: newPost
  });
};

// Get all blog posts
const getAllPosts = (req, res) => {
  const posts = readPosts();

  res.status(200).json({
    success: true,
    count: posts.length,
    data: posts
  });
};

// Get one blog post by ID
const getSinglePost = (req, res) => {
  const postId = Number(req.params.id);
  const posts = readPosts();

  const post = posts.find((item) => item.id === postId);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Blog post not found"
    });
  }

  res.status(200).json({
    success: true,
    data: post
  });
};

// Update a blog post
const updatePost = (req, res) => {
  const postId = Number(req.params.id);
  const { title, content, author, category } = req.body;

  const posts = readPosts();

  const postIndex = posts.findIndex((item) => item.id === postId);

  if (postIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Blog post not found"
    });
  }

  posts[postIndex] = {
    ...posts[postIndex],
    title,
    content,
    author,
    category,
    updatedDate: new Date().toISOString()
  };

  writePosts(posts);

  res.status(200).json({
    success: true,
    message: "Blog post updated successfully",
    data: posts[postIndex]
  });
};

// Delete a blog post
const deletePost = (req, res) => {
  const postId = Number(req.params.id);
  const posts = readPosts();

  const postIndex = posts.findIndex((item) => item.id === postId);

  if (postIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Blog post not found"
    });
  }

  const deletedPost = posts[postIndex];

  posts.splice(postIndex, 1);
  writePosts(posts);

  res.status(200).json({
    success: true,
    message: "Blog post deleted successfully",
    data: deletedPost
  });
};

module.exports = {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost
};