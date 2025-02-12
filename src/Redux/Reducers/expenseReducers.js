import { createSlice } from "@reduxjs/toolkit";
import { fetchExpenses,addExpense,updateExpense } from "../Actions/expenseActions";

const expenseSlice = createSlice({
    name:'expenses',
    initialState:{
        expenses:[],
        status:"idle",
        error:null
    },
    reducers:{},
    extraReducers : (bulider)=>{
        bulider
        .addCase(fetchExpenses.pending,(state)=>{
            state.status = 'loading'
        })
        .addCase(fetchExpenses.fulfilled,(state,action)=>{
            state.status = "succeeded",
            state.expenses = action.payload
        })
        .addCase(fetchExpenses.rejected,(state,action)=>{
            state.status = "failed",
            state.error = action.payload?.message || 'Error Fetching expenses'
        })
        .addCase(addExpense.pending,(state)=>{
            state.status = 'loading'
        })
        .addCase(addExpense.fulfilled,(state,action)=>{
            state.status = 'succeeded',
            state.expenses.push(action.payload)
        })
        .addCase(addExpense.rejected,(state,action)=>{
            state.status = 'failed',
            state.error = action.payload?.message || 'Error adding expense'
        })
        .addCase(updateExpense.pending,(state)=>{
            state.status = 'loading'
        })
        .addCase(updateExpense.fulfilled,(state,action)=>{
            state.status = 'succeeded',
            state.expenses = state.expenses.map((expense) => expense._id === action.payload._id ?
            action.payload : expense)
        })
        .addCase(updateExpense.rejected,(state,action)=>{
            state.status = 'failed',
            state.error = action.payload?.message || 'Error updating expense'
        })

    }
})

export default expenseSlice.reducer;