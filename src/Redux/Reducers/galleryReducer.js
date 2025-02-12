import { createSlice } from "@reduxjs/toolkit";
import { addGallery,deleteGallery,fetchAllGallery } from "../Actions/galleryAction";
const gallerySlice = createSlice({
    name: 'gallery',
    initialState: {
        gallery:[],
        status:"idle",
        error:null
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(addGallery.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(addGallery.fulfilled, (state,action) => {
            state.status = 'succeeded',
            state.gallery.push(action.payload)
        })
        .addCase(addGallery.rejected, (state,action) => {
            state.status = 'failed',
            state.error = action.error.message || 'Error adding gallery'
        })
        // Handle delete gallery
        .addCase(deleteGallery.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(deleteGallery.fulfilled, (state,action) => {
            state.status = 'succeeded',
            state.gallery = state.gallery.filter((item)=> item._id !== action.payload._id)
        })
        .addCase(deleteGallery.rejected, (state,action) => {
            state.status = 'failed',
            state.error = action.error.message || 'Error deleting gallery'
        })
        // Handle fetch all gallery
        .addCase(fetchAllGallery.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchAllGallery.fulfilled, (state,action) => {
            state.status = 'succeeded',
            state.gallery = action.payload
        })
        .addCase(fetchAllGallery.rejected, (state,action) => {
            state.status = 'failed',
            state.error = action.error.message || 'Error fetching gallery'
        })
    }
})


export default gallerySlice.reducer;