import React, { useState } from "react";
import { ImageUp, SquareCheckBig, NotebookText } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Spinner from '../../Components/Spinner/Spinner'

const CompanyProfileForm = () => {
  const [data, setData] = useState({
    companyName: "",
    tagline: "",
    socialLinks: {
      facebook: "",
      twitter: "",
      linkedin: "",
      instagram: "",
    },
    ourStory: "",
    ourMission: "",
    coverImage: null,
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setImage(files[0]?.name || null);
      setData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [name]: value },
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (
      !data.companyName ||
      !data.tagline ||
      !data.ourStory ||
      !data.ourMission ||
      !data.coverImage
    ) {
      toast.error("Please fill in all fields before submitting.");
      setLoading(false); // Ensure loading stops if validation fails
      return;
    }
  
    const formData = new FormData();
    formData.append("companyName", data.companyName);
    formData.append("tagline", data.tagline);
    formData.append("coverImage", data.coverImage);
    formData.append("ourStory", data.ourStory);
    formData.append("ourMission", data.ourMission);
  
    // Convert socialLinks object to JSON string
    formData.append("socialLinks", JSON.stringify(data.socialLinks));
  
    try {
      const res = await fetch(
        "https://dashboard-backend-rw1e.onrender.com/api/v1/about/Create",
        {
          method: "POST",
          body: formData,
        }
      );
  
      const result = await res.json();
      console.log(result);
  
      if (res.ok) {
        toast.success("Company profile submitted successfully");
        setData({
          companyName: "",
          tagline: "",
          coverImage: "",
          ourStory: "",
          ourMission: "",
          socialLinks: {
            linkedin: "",
            instagram: "",
            facebook: "",
            twitter: "",
          }
        })
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Submission failed. Please try again.");
    } finally {
      setLoading(false); // Ensure loading state is reset even if an error occurs
    }
  };
  

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg">
        <div className="flex flex-row items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold flex items-center">
            Company Profile
          </h2>
          <Link
            to="/About"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go Back
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className="text-2xl font-semibold text-center mb-4">
            Add Company Profile
          </h1>
          <hr className="w-1/2 mx-auto border border-yellow-400 mb-4" />

          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-md border-2 outline-none focus:border-yellow-400 border-gray-400"
              name="companyName"
              value={data.companyName}
              onChange={handleChange}
              placeholder="Enter Compnay Name ..."
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700 mb-1">
              Tagline
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-md border-2 outline-none focus:border-yellow-400 border-gray-400"
              name="tagline"
              value={data.tagline}
              onChange={handleChange}
              placeholder="Enter Tagline ..."
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700 mb-1">
              Company Logo
            </label>
            <label
              htmlFor="image"
              className="font-medium p-2 rounded-md border-2 border-gray-400 flex justify-center items-center gap-x-4 cursor-pointer"
            >
              {image ? (
                <>
                  <span className="font-sans text-gray-400 text-sm">
                    {image}
                  </span>
                  <SquareCheckBig size={30} className="text-green-700" />
                </>
              ) : (
                <>
                  <ImageUp size={30} className="text-gray-700" />
                  <span className="font-sans text-gray-400 text-sm">
                    Upload Company Logo
                  </span>
                </>
              )}
            </label>
            <input
              type="file"
              id="image"
              className="hidden"
              name="coverImage"
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["facebook", "twitter", "linkedin", "instagram"].map((platform) => (
              <div className="flex flex-col" key={platform}>
                <label className="text-lg font-semibold text-gray-700 mb-1 capitalize">
                  {platform}
                </label>
                <input
                  type="text"
                  className="w-full p-3 rounded-md border-2 outline-none focus:border-yellow-400 border-gray-400"
                  name={platform}
                  placeholder={`Enter ${platform} URL`}
                  value={data.socialLinks[platform]}
                  onChange={handleSocialLinkChange}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700 mb-1">
              Our Story
            </label>
            <ReactQuill
              theme="snow"
              value={data.ourStory}
              onChange={(value) => setData((prev) => ({ ...prev, ourStory: value }))}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-semibold text-gray-700 mb-1">
              Our Mission
            </label>
            <ReactQuill
              theme="snow"
              value={data.ourMission}
              onChange={(value) => setData((prev) => ({ ...prev, ourMission: value }))}
            />
          </div>

          <div className="flex justify-center items-end p-4">
            <button
              type="submit"
              className="w-36 my-4 p-3 hover:bg-yellow-500 bg-yellow-400 text-white rounded-md text-center"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
      {loading && <Spinner/>}
    </div>
  );
};

export default CompanyProfileForm;
