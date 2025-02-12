import React from "react";
import { Trash2 } from "lucide-react";
import { deleteJob, fetchJobs } from "../../Redux/Actions/jobAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDeleteModal = ({ isOpen, onClose, job }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.jobs);

  const handleDelete = async () => {
    const res = await dispatch(deleteJob(job._id));
    console.log(res)
    if (res.type === "jobs/delete/fulfilled") {
      toast.success("Job deleted successfully");
      onClose();
      fetchJobs();
    } else {
      toast.error("Failed to delete job");
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform transition-all duration-200 border border-gray-100">
        <div className="flex items-center justify-center mb-6">
          <Trash2 className="w-16 h-16 text-red-500" />
        </div>
        <h3 className="text-xl font-semibold text-center mb-2">
          Delete {job.title}?
        </h3>

        <p className="text-gray-500 text-center mb-8">
          Are you sure you want to delete this {"Job"}?
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full text-black bg-gradient-to-r   hover:bg-green-5 border border-gray-300 hover:border-gray-400 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-6 py-2.5 rounded-full text-white bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-red-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 w-24"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDeleteModal;
