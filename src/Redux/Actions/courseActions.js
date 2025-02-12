import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch Course Data
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const response = await fetch(
      "https://dashboard-backend-rw1e.onrender.com/api/v1/course/getAllCourse"
    );
    const data = await response.json();
    return data.courses;
  }
);

// Add Course Data
export const addCourse = createAsyncThunk(
  "courses/addCourse",
  async (courseData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://dashboard-backend-rw1e.onrender.com/api/v1/course/Create",
        {
          method: "POST",
          body: courseData,
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data);
      }
      return data;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

// Delete a Course
export const deleteCourse = createAsyncThunk(
  "courses/deleteCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://dashboard-backend-rw1e.onrender.com/api/v1/course/deleteCourse/${courseId}`,{
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

// Update a course 


export const updateCourse = createAsyncThunk(
  "courses/updateCourse",
  async ({ courseId, updatedData }, { rejectWithValue }) => {
    try {
      
      const response = await fetch(
        `https://dashboard-backend-rw1e.onrender.com/api/v1/course/updateCourse/${courseId}`,
        {
          method: "PUT",
          headers:{
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data);
      }
      return data; 
    } catch (error) {
      console.error("Error in updateCourse action:", error);
      return rejectWithValue({ message: error.message });
    }
  }
);
