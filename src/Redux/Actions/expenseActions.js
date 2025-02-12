import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchExpenses = createAsyncThunk(
    'expenses/fetchExpenses',
    async ()=>{
        try {
            const res = await fetch('https://dashboard-backend-rw1e.onrender.com/api/v1/expense/getAllExpenses');
            const data = await res.json();
            return data.expenses;
        } catch (error) {
            console.log(error)
        }
    }
)

export const addExpense = createAsyncThunk(
    'expenses/addExpense',
    async (expenseData) => {
        try {
            const res = await fetch('https://dashboard-backend-rw1e.onrender.com/api/v1/expense/Create',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                  },
                body:JSON.stringify(expenseData)
            })
            const data = await res.json();
            console.log(data);
            return data.expense;
        } catch (error) {
            console.log('Error at adding task : ',error)
        }
    })

    export const updateExpense = createAsyncThunk(
        'expenses/updateExpense',
        async ({expenseId,updatedData})=>{
            try {
                const res = await fetch(`https://dashboard-backend-rw1e.onrender.com/api/v1/expense/update/${expenseId}`,{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                        },
                        body:JSON.stringify(updatedData)
                })
                const data = await res.json();
                console.log(data);
                return data.expense;
            } catch (error) {
                console.log('Error updating expense : ',error)
            }
        }
    )


export const deleteExpense = createAsyncThunk(
    'expenses/deleteExpense',
    async (expenseId) => {
        try {
            const res = await fetch(`https://dashboard-backend-rw1e.onrender.com/api/v1/expense/delete/${expenseId}`,{
                method: 'DELETE',
            })
            const data = await res.json();
            console.log(data);
            return data.expense;
        } catch (error) {
            console.log('Error at deleting expense : ',error)
        }
    })