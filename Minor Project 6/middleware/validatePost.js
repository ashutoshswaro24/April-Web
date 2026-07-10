const validatePost = (req, res, next) => {
  const { title, content, author, category } = req.body;

  if (!title || !content || !author || !category) {
    return res.status(400).json({
      success: false,
      message: "Title, content, author, and category are required"
    });
  }

  next();
};

module.exports = validatePost;