import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch,useSelector } from 'react-redux';
import {addExpense} from '../../Redux/Actions/expenseActions'
import Spinner from '../../Components/Spinner/Spinner'
const ExpenseForm = () => {
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    paymentMethod: '',
    description: '',
    date: '',
  });

  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const {status} = useSelector((state)=>state.expenses)
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category || !formData.amount || !formData.paymentMethod || !formData.date || !formData.description) {
      toast.error('Please fill all required fields!');
      return;
    }
    const res = await dispatch(addExpense(formData));
    if(res.type === 'expenses/addExpense/fulfilled'){
      toast.success('Expense added successfully!');
      // setFormData({category:'',amount:'',paymentMethod:'',description:'',date:''})
    }else{
      toast.error('Error adding expense!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-1/2 mx-auto shadow-yellow-400 my-10">
      {status === "loading" && <Spinner/>} 
      <h2 className="text-2xl font-semibold mb-4 text-center p-4">Add Expense</h2>
      <hr className='w-1/2 mx-auto border-2  border-yellow-400' />
      <Link to='/Expense' className='bg-blue-600 text-white float-right px-4 py-2 rounded-md font-semibold hover:bg-blue-500'>Go Back</Link>
      
      <label htmlFor='category' className="block my-8 font-medium text-gray-700">Select Category</label>
      <select id="category" name="category" value={formData.category} onChange={handleChange}   
      className="w-full p-4 border-2 border-gray-500 focus:border-yellow-400 outline-none rounded-md">
        <option value="">Select Category</option>
        <option value="Salary">Salary</option>
        <option value="Utilities">Utilities</option>
        <option value="Rent">Rent</option>
        <option value="Office Supplies">Office Supplies</option>
        <option value="Other">Other</option>
      </select>
      
      <label htmlFor='amount' className="block my-4 font-medium text-gray-700 mt-3">Enter Amount </label>
      <input type="number" placeholder='Enter Amount...' id="amount" name="amount" value={formData.amount} onChange={handleChange}   
      className="w-full p-4 border-2 border-gray-500 rounded-md outline-none focus:border-yellow-400" />
      
      <label className="block my-4 font-medium text-gray-700 mt-3">Payment Method</label>
      <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}   
      className="w-full p-4 border-2 outline-none focus:border-yellow-400 border-gray-500 rounded-md">
        <option value="">Select Payment Method</option>
        <option value="Cash">Cash</option>
        <option value="Credit Card">Credit Card</option>
        <option value="Bank Transfer">Bank Transfer</option>
        <option value="UPI">UPI</option>
        <option value="Other">Other</option>
      </select>
      
      <label className="block my-4 font-medium text-gray-700 mt-3">Description</label>
      <textarea name="description" placeholder='Enter a description.....' value={formData.description} onChange={handleChange} 
      className="w-full p-4 border-2 outline-none focus:border-yellow-400 border-gray-500 rounded-md"></textarea>
      
      <label className="block my-4 font-medium text-gray-700 mt-3">Date</label>
      <input type="date" name="date" value={formData.date} onChange={handleChange}   
      className="w-full p-4 border-2 outline-none border-gray-500 focus:border-yellow-400 rounded-md" />
      
      <button type="submit" className="mt-4  bg-yellow-400 text-white px-4 py-3 font-semibold  rounded hover:bg-yellow-500 "
       disabled={status === "loading"}
      >Submit Expense</button>
    </form>
  );
};

export default ExpenseForm;