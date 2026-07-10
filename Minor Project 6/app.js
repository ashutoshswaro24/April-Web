const express = require("express");
const postRoutes = require("./routes/postRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Blog REST API",
        status: "Server Running Successfully"
    });
});

// Blog Routes
app.use("/posts", postRoutes);

// Error Handler
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});