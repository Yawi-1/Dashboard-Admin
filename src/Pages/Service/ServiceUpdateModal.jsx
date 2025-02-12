import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useDispatch,useSelector } from "react-redux";
import { updateService,fetchServices } from "../../Redux/Actions/serviceActions";
import Spinner from "../../Components/Spinner/Spinner";


const ServiceUpdateModal = ({ isOpen, onClose, service }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const {status} = useSelector((state)=>state.services);

  // Reset the state whenever the service prop changes
  useEffect(() => {
    if (service) {
      setTitle(service.title || "");
      setDescription(service.description || "");
    }
  }, [service]);

  // Handle file input change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Append image if provided

    try {
      // Dispatch updateService action
      const res = await dispatch(updateService({ serviceId: service._id, title, description }));
      if (status === "succeeded") {
        toast.success("Service updated successfully!");
        dispatch(fetchServices());
        onClose();
      } else if (status === "failed") {
        toast.error("Failed to update service.");
      }
    } catch (error) {
      toast.error("Failed to update service.");
      console.log(error); // Log error for debugging
    }
  };

  if (!isOpen) return null; // If modal is closed, don't render anything

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-50 rounded-2xl w-[43%] max-h-[95vh] overflow-y-auto shadow-2xl transform transition-all">
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r">
          <h2 className="text-2xl font-bold text-black">Update Service</h2>
          <button
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            onClick={onClose}
          >
            <X className="h-9 w-9 text-red-600 bg-red-300 rounded-full" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Service Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#edba12] transition-all"
              placeholder="Enter service title..."
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#edba12] transition-all"
              placeholder="Enter service description..."
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
          >
            Submit
          </button>
        </div>
      </div>
      {/* Spinner  */}
      {status === "loading" && <Spinner/>}
          </div>
  );
};

export default ServiceUpdateModal;
