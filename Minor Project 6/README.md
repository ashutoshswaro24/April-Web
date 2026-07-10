# Blog REST API with CRUD Operations

## Project Overview

This project is a Blog REST API developed using Node.js and Express.js.

It allows users to create, read, update, and delete blog posts using REST API endpoints.

The blog data is stored in a JSON file.

## Technologies Used

- Node.js
- Express.js
- JavaScript
- JSON File Storage
- Thunder Client

## Features

- Create a new blog post
- Get all blog posts
- Get a single blog post by ID
- Update an existing blog post
- Delete a blog post
- Input validation
- Error handling
- Proper HTTP status codes
- JSON responses

## Project Structure

```text
Minor Project 6
│
├── controllers
│   └── postController.js
│
├── data
│   └── posts.json
│
├── middleware
│   ├── errorHandler.js
│   └── validatePost.js
│
├── routes
│   └── postRoutes.js
│
├── app.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md