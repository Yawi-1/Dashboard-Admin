import { createSlice } from "@reduxjs/toolkit";
import { fetchBlogs,addBlog,deleteBlog,updateBlog } from "../Actions/BlogAction";
const blogSlice = createSlice({
    name: "blog",
    initialState: {
        blogs: [],
        status:"idle",
        error:null
        },
        reducers: {},
        extraReducers: (builder) => {
            builder
            .addCase(fetchBlogs.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.blogs = action.payload;
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || 'Error fetching blogs';
            })
            // Handle add Blog
            .addCase(addBlog.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addBlog.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.blogs.push(action.payload);
            })
            .addCase(addBlog.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || 'Error adding blog';
            })
            // Handle delete
            .addCase(deleteBlog.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.blogs = state.blogs.filter((blog) => blog._id !== action.payload._id);
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || 'Error deleting blog';
            })
            // Handle Update
            .addCase(updateBlog.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.blogs = state.blogs.map((blog) => blog._id === action.payload._id ?
                { ...blog, ...action.payload } : blog);
            })
            .addCase(updateBlog.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || 'Error updating blogs';
            })

        }
})


export default blogSlice.reducer;