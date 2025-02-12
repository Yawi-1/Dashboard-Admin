import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://dashboard-backend-rw1e.onrender.com/api/v1/blog";

export const addBlog = createAsyncThunk("blog/addBlog", async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/Create`, {
      method: "POST",
      body: formData, 
    });
    
    if (!response.ok) {
      const errorText = await response.text(); // Read error message
      throw new Error(`Server Error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    console.log("Add Response", data.blog);
    return data.blog;
    
  } catch (error) {
    console.error("Error adding blog : ", error);
  }
});

// Fetch Blogs 
export const fetchBlogs = createAsyncThunk("blog/fetchBlogs", async () => {
  try {
    const response = await fetch(`${BASE_URL}/getAllBlogs`);
    const data = await response.json();
    return data.data.blogs;
  } catch (error) {
    console.error("Error Fetching blog : ", error);
  }
});
export const deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async (blogId) => {
    try {
      const response = await fetch(`${BASE_URL}/deleteBlog/${blogId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      return data.blog;
    } catch (error) {
      console.error("Error Deleting blog : ", error);
    }
  }
);



export const updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async ({ blogId, formData }) => {
    try {
      const response = await fetch(`${BASE_URL}/updateBlog/${blogId}`, {
        method: "PUT",
        headers:{
           'Content-Type':'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Update  Response  ", data);
      return data.blog;
    } catch (error) {
      console.error("Error Deleting blog : ", error);
    }
  }
);
