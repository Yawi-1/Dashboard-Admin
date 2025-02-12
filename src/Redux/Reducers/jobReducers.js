import { createSlice } from "@reduxjs/toolkit";
import { fetchJobs,addJob,deleteJob } from "../Actions/jobAction";
const jobSlice = createSlice({
    name: "jobs",
    initialState:{
        jobs: [],
        status : 'idle',
        error : null
    },
    reducers : {},
    extraReducers : (builder) => {
        builder
           .addCase(fetchJobs.pending, (state)=>{
            state.status = "loading"
           })
           .addCase(fetchJobs.fulfilled,(state,action)=>{
            state.status = "succeeded",
            state.jobs  = action.payload
           })
           .addCase(fetchJobs.rejected,(state,action)=>{
            state.status = "failed",
            state.error = action.payload?.message || 'Error fetching jobs...'
           })
        //    Handle add job cases
           .addCase(addJob.pending,(state)=>{
            state.status = "loading"
           })
           .addCase(addJob.fulfilled,(state,action)=>{
            state.status = "succeeded",
             state.jobs.push(action.payload)
           })
           .addCase(addJob.rejected,(state,action)=>{
            state.status = "failed",
            state.error  =  action.payload?.message || 'Error adding job...'
           })
           .addCase(deleteJob.pending,(state)=>{
            state.status = 'loading'
           })
           .addCase(deleteJob.fulfilled,(state,action)=>{
            state.status = "succeeded",
            state.jobs = state.jobs.filter((job)=> job._id !== action.payload._id)
           })
           .addCase(deleteJob.rejected,(state,action)=>{
            state.status = "failed",
            state.error = action.payload?.message || 'Error deleting job...'
           })
    }
})

   export default jobSlice.reducer;