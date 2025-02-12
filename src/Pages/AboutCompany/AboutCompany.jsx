import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import AboutDeleteModal from "./AboutDeleteModal";
import Spinner from "../../Components/Spinner/Spinner";

const AboutCompany = () => {
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null); // Track item to delete

  useEffect(() => {
    fetchCompanyData();
  }, []);

  const fetchCompanyData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://dashboard-backend-rw1e.onrender.com/api/v1/about/getAbout"
      );
      const data = await response.json();
      setCompanyData(data.about);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedId) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://dashboard-backend-rw1e.onrender.com/api/v1/about/delete/${selectedId}`,
        { method: "DELETE" }
      );
      const result = await res.json();

      if (res.ok) {
        toast.success("Entry deleted successfully");
        setCompanyData((prev) => prev.filter((item) => item._id !== selectedId));
      } else {
        toast.error(result.message || "Failed to delete entry");
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
      toast.error("An error occurred while deleting");
    } finally {
      setLoading(false);
      setModalOpen(false);
      setSelectedId(null);
    }
  };

  return (
    <div className="py-10 px-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Company Information</h1>
          <Link
            to="/About/form"
            className="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 transition"
          >
            Add New About
          </Link>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Company Logo</th>
                <th className="py-3 px-4 text-left">Company Name</th>
                <th className="py-3 px-4 text-left">Tagline</th>
                <th className="py-3 px-4 text-left">Our Story</th>
                <th className="py-3 px-4 text-left">Our Mission</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-4 text-center">
                    <Spinner />
                  </td>
                </tr>
              ) : companyData.length > 0 ? (
                companyData.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-gray-200 hover:bg-gray-100 transition"
                  >
                    <td className="py-3 px-4"><img src={item.coverImage} className="w-24 h-24 rounded-full"/></td>
                    <td className="py-3 px-4">{item.companyName}</td>
                    <td className="py-3 px-4">{item.tagline}</td>
                    <td className="py-3 px-4">
                    <div
                         className="ql-editor"
                         dangerouslySetInnerHTML={{ __html: item.ourStory }}
                       ></div>
                    </td>
                    <td className="py-3 px-4">
                    <div
                         className="ql-editor"
                         dangerouslySetInnerHTML={{ __html: item.ourMission }}
                       ></div>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => confirmDelete(item._id)}
                        className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AboutDeleteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default AboutCompany;
