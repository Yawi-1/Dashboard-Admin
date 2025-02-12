import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addService } from "../../Redux/Actions/serviceActions";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Spinner from "../../Components/Spinner/Spinner";

const ServiceForm = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.services);
  console.log(status);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const titleRef = useRef();
  const descriptionRef = useRef();


  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]); // Store the selected file in state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validation
      if (!title.trim()) {
        toast.info("Title is required...");
        titleRef.current.focus();
        return;
      }
      if (!description.trim()) {
        toast.info("Description is required...");
        descriptionRef.current.focus();
        return;
      }
      if (!coverImage) {
        toast.error("Please upload a cover image.");
        return;
      }

      // Prepare form data for file upload
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("description", description.trim());
      formData.append("coverImage", coverImage); // Append the file

      // Dispatch action to add the service
      const result = await dispatch(addService(formData));

      if (addService.rejected.match(result)) {
        throw new Error(result.payload || "Failed to create a new service.");
      }

      // Show success message and reset form
      toast.success("Successfully created a new service!");
      setTitle("");
      setDescription("");
      setCoverImage(null); // Clear the file input
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-row items-center justify-between p-6">
        <h2 className="text-2xl font-semibold flex items-center">
          <Settings className="w-6 h-6 mr-2 ml-4 text-yellow-600" />
          Services
        </h2>
      </div>
      <h1></h1>

      {/* Service Form */}
      <form
        onSubmit={handleSubmit}
        className="w-1/2 mx-auto p-6 rounded shadow shadow-yellow-400"
        encType="multipart/form-data"
      >
        <h1 className="text-2xl font-semibold text-center my-2">
          Add New Service
        </h1>
        <hr className="w-1/2 mx-auto border border-yellow-400" />

        {/* Title Input */}
        <div className="mb-4">
          <label
            className="block my-2 text-lg font-semibold text-gray-700"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            ref={titleRef}
            className="w-full p-3 rounded-md border-2 outline-none focus:border-yellow-400 border-gray-400"
            placeholder="Enter service title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            id="title"
          />
        </div>

        {/* Description Input */}
        <div>
          <label
            className="block my-2 text-lg font-semibold text-gray-600"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="w-full p-3 rounded-md border-2 outline-none focus:border-yellow-400 border-gray-400"
            placeholder="Enter service description..."
            ref={descriptionRef}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            id="description"
            rows={3}
          ></textarea>
        </div>

        {/* File Input */}
        <div>
          <label
            className="block my-2 text-lg font-semibold text-gray-600"
            htmlFor="coverImage"
          >
            Cover Image
          </label>
          <input
            type="file"
            className="w-full p-3 rounded-md border-2 outline-none focus:border-yellow-400 border-gray-400"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center font-semibold p-2">
          <button
            type="submit"
            className="w-36 my-4 p-3 hover:bg-yellow-500 bg-yellow-400 text-white rounded-md border text-center"
            disabled={status === "loading"}
          >
            {status !== "loading" ? "Add" : "Loading...."}
          </button>

          <Link
            to="/Service"
            className="text-center p-3 bg-blue-600 rounded-md hover:bg-blue-500 text-white"
          >
            Go Back
          </Link>
        </div>
      </form>
      {status === "loading" && <Spinner/>}
    </div>
  );
};

export default ServiceForm;
