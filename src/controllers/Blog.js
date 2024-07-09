
import Blog from '../models/Blog.js';




const createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;
   
    

  
    

    const blog = new Blog({
      title,
      content,
      author,
    
    });

    // Save the new blog to the database
    await blog.save();

    res.status(201).json({success: true, message: 'Blog created successfully', blog });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a blog', errorMsg: error.message });
  }
};


// Get all blog posts based on the state (published or draft), with pagination
const getAllBlogs = async (req, res) => {
  const page = parseInt(req.query.skip) || 0;
  const limit = parseInt(req.query.limit) || 6; 
  const { state, author } = req.query;
  
  const query = state ? { state } : {}; 

 

  try {
    const totalPosts = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(page * limit) 
      .limit(limit)
    

    res.json({
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: Math.floor(page / limit) + 1,
      blogs
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blogs', error: error.message });
  }
};

// Get a blog post by ID
const getBlogById = async (req, res) => {
  try { 
    const { _id } = req.params;
    const blog = await Blog.findById(_id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the blog', error: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { _id } = req.params;
    const blogData = req.body;
 

    const existingBlog = await Blog.findById(_id);

    if (!existingBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    

    

    // Update blog data
    if (blogData.title) {
      existingBlog.title = blogData.title;
    }
    if (blogData.content) {
      existingBlog.content = blogData.content;
    }
    if (blogData.author) {
      existingBlog.author= blogData.author;
    }
    
    const updatedBlog = await existingBlog.save();

    res.json({ message: 'Blog updated successfully', blog: updatedBlog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to update blog', errorMsg: error.message });
  }
};

// Delete a specific blog post
const deleteBlog = async (req, res) => {
  try {
    const { _id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(_id);

    if (!deletedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete blog', errorMsg: error.message });
  }
};








export { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog };