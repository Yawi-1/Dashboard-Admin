import React, { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, Settings } from "lucide-react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ServiceUpdateModal from "./ServiceUpdateModal";
import ServiceDeleteModal from "./ServiceDeleteModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../Redux/Actions/serviceActions";
import Spinner from "../../Components/Spinner/Spinner";
import ServiceInfoModal from "./ServiceInfoModal";

const ServiceTable = () => {
  const dispatch = useDispatch();
  // Fetching services from the Redux store
  const { services, status } = useSelector((state) => state.services);

  // Fetch services on component mount
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // For update modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // For delete modal
  const [isInfoModalOpen,setIsInfoModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState(null); // Currently selected service for update/delete


  const handleEdit = (service) => {
    setSelectedService(service);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = (id) => {
    setSelectedService(id);
    setIsDeleteModalOpen(true);
  };
  const handleView = (service) => {
    setSelectedService(service);
    setIsInfoModalOpen(true);
  };

  return (
    <div className="w-full bg-gray-50">
      <div className="flex flex-row items-center justify-between p-6">
        <h2 className="text-2xl font-semibold flex items-center">
          <Settings className="w-6 h-6 mr-2 ml-4 text-yellow-600" />
          Service Management
        </h2>
        <Link
          to="/Service/form"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Service
        </Link>
      </div>

      <div className="p-6 pt-0">
        <div className="relative overflow-x-auto rounded-lg shadow">
          <table className="w-full text-left bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 w-16 font-semibold">S.No</th>
                <th className="p-4 w-48 font-semibold">Title</th>
                <th className="p-4 font-semibold">Description</th>
                <th className="p-4 w-32 font-semibold">Info</th>
                <th className="p-4 w-32 font-semibold">Update</th>
                <th className="p-4 w-32 font-semibold">Delete</th>
              </tr>
            </thead>
            {status === "loading" ? (
              <Spinner />
            ) : (
              <tbody>
                {services.map((service, index) => (
                  <tr key={service._id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{index + 1}.</td>
                    <td className="p-4 font-medium">{service.title}</td>
                    <td className="p-4 text-gray-600">{service.description}</td>
                    <td className="p-4">
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => handleView(service)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                    <td className="p-4">
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => handleEdit(service)}
                        className="h-8 w-8 p-0"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </td>
                    <td className="p-4">
                      <Button
                        variant="text"
                        size="small"
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(service._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>

      {/* Update Service Modal */}
      <ServiceUpdateModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        service={selectedService}
      />

      {/* Delete Service Modal */}
      <ServiceDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        id={selectedService}
      />
      {/* Info Service Modal */}
      <ServiceInfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        service={selectedService}
      />
    </div>
  );
};

export default ServiceTable;
