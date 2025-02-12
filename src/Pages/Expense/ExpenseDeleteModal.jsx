import React from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpense, fetchExpenses } from "../../Redux/Actions/expenseActions";

const ExpenseDeleteModal = ({ isOpen, onClose, id }) => {
  const { status } = useSelector((state) => state.expenses);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      const res = await dispatch(deleteExpense(id));
      
      if (res.type === "expenses/deleteExpense/fulfilled") {
        toast.success(`Expense deleted successfully.`);
        dispatch(fetchExpenses());
      } else {
        toast.error(`Failed to delete expense.`);
      }
    } catch (error) {
      toast.error(`Error: ${error.message || 'Something went wrong'}`);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white text-center p-6 rounded-xl shadow-lg w-96">
        <p className="pb-6 text-xl font-semibold text-gray-800">
          Are you sure you want to delete this expense?
        </p>
        <div className="flex justify-center gap-6 mt-4">
          <button 
            onClick={handleDelete}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Deleting..." : "Yes, Delete"} 
          </button>
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseDeleteModal;