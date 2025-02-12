import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { updateExpense, fetchExpenses } from '../../Redux/Actions/expenseActions';
import Spinner from '../../Components/Spinner/Spinner';

const ExpenseUpdateModal = ({ isOpen, onClose, expense }) => {
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    paymentMethod: '',
    description: '',
    date: '',
  });

  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.expenses);

  // Initialize form with expense data
  useEffect(() => {
    if (expense) {
      setFormData({
        category: expense.category || '',
        amount: expense.amount || '',
        paymentMethod: expense.paymentMethod || '',
        description: expense.description || '',
        date: expense.date?.split('T')[0] || '',
      });
    }
  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.category || !formData.amount || !formData.paymentMethod || !formData.date || !formData.description) {
      toast.error('Please fill all required fields!');
      return;
    }

    try {
      const res = await dispatch(updateExpense({ 
        expenseId: expense._id, 
        updatedData: formData 
      }));

      if (status === 'succeeded') {
        toast.success('Expense updated successfully!');
        dispatch(fetchExpenses());
        onClose();
      } else if (status === 'failed') {
        toast.error('Failed to update expense.');
      }
    } catch (error) {
      toast.error('Failed to update expense.');
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-50 rounded-2xl w-[43%] max-h-[95vh] overflow-y-auto shadow-2xl transform transition-all">
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r">
          <h2 className="text-2xl font-bold text-black">Update Expense</h2>
          <button
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            onClick={onClose}
          >
            <X className="h-9 w-9 text-red-600 bg-red-300 rounded-full" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#edba12] transition-all"
            >
              <option value="">Select Category</option>
              <option value="Salary">Salary</option>
              <option value="Utilities">Utilities</option>
              <option value="Rent">Rent</option>
              <option value="Office Supplies">Office Supplies</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#edba12] transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#edba12] transition-all"
            >
              <option value="">Select Payment Method</option>
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="UPI">UPI</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#edba12] transition-all"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#edba12] transition-all"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 p-6 border-t bg-gray-50">
          <button
            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#edba12] to-[#e2b931] rounded-lg hover:opacity-90 transition-colors"
            onClick={handleSubmit}
            disabled={status === "loading"}
          >
            {status === "loading" ? 'Updating' : "Update Expense"}
          </button>
        </div>
      </div>
      {status === 'loading' && <Spinner />}
    </div>
  );
};

export default ExpenseUpdateModal;