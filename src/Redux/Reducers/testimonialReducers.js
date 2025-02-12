import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTestimonials,
  addTestimonials,
  deleteTestimonials,
} from "../Actions/testimonialAction";

const testimonialSlice = createSlice({
  name: "testimonial",
  initialState: {
    testimonials: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.testimonials = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Error fetching testimonials";
      })

      //    Handle Add Testimonials
      .addCase(addTestimonials.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTestimonials.fulfilled, (state, action) => {
        state.testimonials.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(addTestimonials.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Error adding testimonials";
      })

      // Handle Delete Testimonials
      .addCase(deleteTestimonials.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTestimonials.fulfilled, (state, action) => {
        state.testimonials = state.testimonials.filter(
          (testimonial) => testimonial.id !== action.payload
        );
        state.status = "succeeded";
      })
      .addCase(deleteTestimonials.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Error deleting testimonials";
      });
  },
});
export default testimonialSlice.reducer;
