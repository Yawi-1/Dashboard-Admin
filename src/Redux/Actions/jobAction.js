import { createAsyncThunk } from "@reduxjs/toolkit";

export const addJob = createAsyncThunk(
    "jobs/addJob",
    async (job)=>{
        try {
            const res = await fetch('https://dashboard-backend-rw1e.onrender.com/api/v1/job/Create',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    },
                    body:JSON.stringify(job)
            });
            const data = await res.json();
            return data.job;    
        } catch (error) {
            console.log(error)
        }
    }
)

export const fetchJobs = createAsyncThunk(
      "jobs/fetchJobs",
      async ()=>{
        try {
            const res = await fetch('https://dashboard-backend-rw1e.onrender.com/api/v1/job/getAllJobs');
            const data = await res.json();
            return data.jobs;
        } catch (error) {
            console.log(error)
        }
      }
)

export const deleteJob = createAsyncThunk(
    'jobs/delete',
    async (jobId)=>{
        try {
            const res = await fetch(`https://dashboard-backend-rw1e.onrender.com/api/v1/job/delete/${jobId}`,{
                method:'DELETE',
            })
            const data = await res.json();
            return data.job;
        } catch (error) {
            console.log(error)
        }
    }
)