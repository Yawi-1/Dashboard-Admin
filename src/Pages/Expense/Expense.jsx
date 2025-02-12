import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HandCoins, Filter, Edit2, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses } from "../../Redux/Actions/expenseActions";
import Spinner from "../../Components/Spinner/Spinner";
import ExpenseUpdateModal from "./ExpenseUpdateModal";
import ExpenseDeleteModal from "./ExpenseDeleteModal";

const Expense = () => {
  const [filters, setFilters] = useState({
    paymentMethod: "",
    dateFrom: "",
    dateTo: "",
  });

  // Fetch Data from Redux Store
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  const { expenses, status } = useSelector((state) => state.expenses);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Filter responses
  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const fromDate = filters.dateFrom ? new Date(filters.dateFrom) : null;
    const toDate = filters.dateTo ? new Date(filters.dateTo) : null;

    return (
      (!filters.paymentMethod ||
        expense.paymentMethod === filters.paymentMethod) &&
      (!fromDate || expenseDate >= fromDate) &&
      (!toDate || expenseDate <= toDate)
    );
  });

  //   Clear Filter
  const clearFilters = () => {
    setFilters({
      paymentMethod: "",
      dateFrom: "",
      dateTo: "",
    });
  };

  // Hanlde Edit
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [expenseToUpdate, setExpenseToUpdate] = useState(null);
  const handleEdit = (expense) => {
    setIsUpdateModal(true);
    setExpenseToUpdate(expense);
  };

  // Handle Delete
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const handleDelete = (expense) => {
    setIsDeleteModal(true);
    setExpenseToUpdate(expense);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center p-6">
        <h2 className="text-2xl font-semibold flex items-center">
          <HandCoins className="w-6 h-6 mr-2 text-yellow-600" /> Expenses
        </h2>
        <Link
          to="/Expense/form"
           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Expense
        </Link>
      </div>

      {(filters.paymentMethod !== "" ||
        filters.dateFrom !== "" ||
        filters.dateTo !== "") && (
        <button
          onClick={clearFilters}
          className="bg-blue-600 px-4 py-2 mx-4 text-white font-semibold rounded-full float-right"
        >
          Clear Filters
        </button>
      )}
      <h1 className="text-4xl text-center font-semibold">
        Total Transactions: {expenses?.length}
      </h1>
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex items-center mb-4">
          <Filter className="w-5 h-5 text-gray-500 mr-2" />
          <h3 className="text-lg font-medium">Filters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={filters.paymentMethod}
            onChange={(e) =>
              handleFilterChange("paymentMethod", e.target.value)
            }
            className="border rounded-md p-2 w-full"
          >
            <option value="">All Methods</option>
            <option value="UPI">UPI</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Cash">Cash</option>
          </select>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
            className="border rounded-md p-2 w-full"
          />
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => handleFilterChange("dateTo", e.target.value)}
            className="border rounded-md p-2 w-full"
          />
        </div>
      </div>

      <div className="overflow-y-auto max-h-[70vh]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-500">
                Date
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500">
                Description
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500">
                Category
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500">
                Amount
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-500">
                Payment Method
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          {status === "loading" ? (
            <Spinner />
          ) : (
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExpenses.map((expense) => (
                <tr key={expense._id}>
                  <td className="px-6 py-4 whitespace-nowrap  text-gray-500">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                    {expense.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap  text-gray-500">
                    {expense.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap  text-gray-900">
                    ${expense.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap  text-gray-500">
                    {expense.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right  font-medium">
                    <button
                      onClick={() => handleEdit(expense)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(expense._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <ExpenseUpdateModal
        isOpen={isUpdateModal}
        expense={expenseToUpdate}
        onClose={() => setIsUpdateModal(false)}
      />
      <ExpenseDeleteModal
        isOpen={isDeleteModal}
        onClose={() => setIsDeleteModal(false)}
        id={expenseToUpdate}
      />
    </div>
  );
};

export default Expense;
