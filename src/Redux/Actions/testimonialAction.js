import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTestimonials = createAsyncThunk(
  "testimonials/fetchTestimonials",
  async () => {
    try {
      const response = await fetch(
        "https://dashboard-backend-rw1e.onrender.com/api/v1/testimonials/getAllTestimonials"
      );
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error at fetching testimonial ", error);
    }
  }
);

// Add Testimonials
export const addTestimonials = createAsyncThunk(
  "testimonials/addTestimonials",
  async (testimonial) => {
    try {
      const response = await fetch(
        "https://dashboard-backend-rw1e.onrender.com/api/v1/testimonials/Create",
        {
          method: "POST",
          body: testimonial,
        }
      );
      const data = await response.json();
      console.log(data);
      return data.data;
    } catch (error) {
      console.error("Error at adding testimonial", error);
    }
  }
);

// Delete Testimonials

export const deleteTestimonials = createAsyncThunk(
  "testimonials/deleteTestimonials",
  async (testimonialId) => {
    try {
      const response = await fetch(
        `https://dashboard-backend-rw1e.onrender.com/api/v1/testimonials/deleteTestimonial/${testimonialId}`,
        {
          method: "DELETE",

        }
      );
      const data = await response.json();
      return data.data;   
    } catch (error) {
      console.error("Error at deleting testimonial", error);
    }
  }
);
