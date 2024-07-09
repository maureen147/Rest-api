

# Blog API

## Overview

The **Blog API** is a backend API application that allows users to create, read, update, and delete blog posts. The app provides endpoints for managing blog posts and uses MongoDB for data storage. It also includes basic input validation and error handling.

## Key Features

1. **Blog Management:**
   - Create blog posts.
   - Retrieve a single blog post by ID.
   - Retrieve all blog posts with pagination and optional filtering by state and author.
   - Update blog posts.
   - Delete blog posts.
   
2. **Validation and Error Handling:**
   - Input validation for required fields and data types.
   - Graceful error handling with appropriate error responses.

## Setup Instructions

1. Clone the repository.
    ```
    git clone https://github.com/maureen147/Rest-api.git
    ```

2. Folder structure

```
blog-api/
├── src/
│   ├── controllers/
│   │   └── Blog.js
│   ├── models/
│   │   └── Blog.js
│   ├── routers/
│   │   └── Blog.js
├── .env
├── package.json
├── package-lock.json
└── index.js
```

2. Install dependencies using `npm install`.
3. Create a `.env` file with the following environment variables:
   ```env
   PORT= 3000
   MONGODB_CONNECTION_URL=your_mongodb_connection_url
   ```
4. Run the application using `npm start`.

## Endpoints

#### Get All Blogs
- **Endpoint:** `[GET] /api/blogs`
- **Description:** Retrieve all blog posts with pagination and optional filtering by state and author.
- **Query Parameters:**
  - `skip`: Number of records to skip for pagination (default: 0).
  - `limit`: Number of records to return per page (default: 6).
- **Response:**
  ```json
  {
    "totalPages": <number>,
    "currentPage": <number>,
    "blogs": [
      {
        "_id": "60d0fe4f5311236168a109ca",
        "title": "Sample Blog",
        "content": "This is a sample blog post.",
        "author": "John Doe",
        "createdAt": "2024-06-21T07:00:00.000Z",
        "updatedAt": "2024-06-21T07:00:00.000Z"
      },
      ...
    ]
  }
  ```

#### Get Blog by ID
- **Endpoint:** `[GET] /api/blog/:_id`
- **Description:** Retrieve a specific blog post by its ID.
- **Response:**
  ```json
  {
    "_id": "60d0fe4f5311236168a109ca",
    "title": "Sample Blog",
    "content": "This is a sample blog post.",
    "author": "John Doe",
    "createdAt": "2024-06-21T07:00:00.000Z",
    "updatedAt": "2024-06-21T07:00:00.000Z"
  }
  ```

#### Create a New Blog
- **Endpoint:** `[POST] /api/create`
- **Request Body:**
  ```json
  {
    "title": "Sample Blog",
    "content": "This is a sample blog post.",
    "author": "John Doe"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Blog created successfully",
    "blog": {
      "_id": "60d0fe4f5311236168a109ca",
      "title": "Sample Blog",
      "content": "This is a sample blog post.",
      "author": "John Doe",
      "createdAt": "2024-06-21T07:00:00.000Z",
      "updatedAt": "2024-06-21T07:00:00.000Z"
    }
  }
  ```

#### Update a Blog
- **Endpoint:** `[PATCH] /api/blog/:_id`
- **Description:** Update an existing blog post by its ID.
- **Request Body:** (At least one field must be provided)
  ```json
  {
    "title": "Updated Blog Title",
    "content": "Updated blog content.",
    "author": "Jane Doe"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Blog updated successfully",
    "blog": {
      "_id": "60d0fe4f5311236168a109ca",
      "title": "Updated Blog Title",
      "content": "Updated blog content.",
      "author": "Jane Doe",
      "createdAt": "2024-06-21T07:00:00.000Z",
      "updatedAt": "2024-06-21T07:00:00.000Z"
    }
  }
  ```

#### Delete a Blog
- **Endpoint:** `[DELETE] /api/blog/:_id`
- **Description:** Delete a blog post by its ID.
- **Response:**
  ```json
  {
    "message": "Blog deleted successfully"
  }
  ```

## Database Configuration

### MongoDB Connection

Ensure you have MongoDB set up and running. Use the provided configuration to connect to the database.

```javascript
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbURL = process.env.MONGODB_CONNECTION_URL;

const connectDb = async () => {
  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("DB Connected successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

connectDb();

export default mongoose;
```

## Running the Application

Use the following command to start the application:

```bash
npm start
```

The application should now be running on the specified port, and you can start interacting with the API endpoints.

---

