import React, { useState } from "react";
import { ImageUp, SquareCheckBig, NotebookText } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { addCourse } from "../../Redux/Actions/courseActions";
import { useDispatch,useSelector } from "react-redux";
import Spinner from '../../Components/Spinner/Spinner'

const CourseForm = () => {
  const dispatch = useDispatch();
  const {status} = useSelector((state)=>state.courses);

  const [data, setData] = useState({
    title: "",
    code: "",
    subjects: "",
    duration: "",
    fees: "",
    discountedFees: "",
    minimumFees: "",
    curriculum: "",
    eligibility: "",
    images: null,
    domain: "",
  });
  const [image, setImage] = useState(null);

  // Handle standard input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setImage(files[0]?.name || null);
      setData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle ReactQuill input changes
  const handleQuillChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      title,
      code,
      subjects,
      duration,
      fees,
      discountedFees,
      minimumFees,
      curriculum,
      eligibility,
      domain,
      images,
    } = data;

    // Validation
    if (
      !title ||
      !code ||
      !subjects ||
      !duration ||
      !fees ||
      !discountedFees ||
      !minimumFees ||
      !curriculum ||
      !eligibility ||
      !domain ||
      !images
    ) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }
    if(discountedFees > 500 ){
      toast.error("Discounted fees cannot be more than 500 of the total fees");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subject", subjects);
    formData.append("duration", duration);
    formData.append("courseCode", code);
    formData.append("courseFees", fees);
    formData.append("discountendfees", discountedFees);
    formData.append("minFeesToPay", minimumFees);
    formData.append("curriculum", curriculum);
    formData.append("eligibilityCriteria", eligibility);
    formData.append("domain", domain);
    formData.append("coverImage", images);

    const result = await dispatch(addCourse(formData));
    if (result.type === "courses/addCourse/fulfilled") {
      toast.success(result.payload.message || "Course added successfully");
      // Clear the form
      setData({
        title: "",
        code: "",
        subjects: "",
        duration: "",
        fees: "",
        discountedFees: "",
        minimumFees: "",
        curriculum: "",
        eligibility: "",
        images: null,
        domain: "",
      });
      setImage(null);
    } else if (result.type === "courses/addCourse/rejected") {
      toast.error(result.payload.message || "Failed to add course");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg">
        <div className="flex flex-row items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold flex items-center">
            <NotebookText className="w-6 h-6 mr-2 text-yellow-600" />
            Courses
          </h2>
          <Link
            to="/Course"
            className="text-center px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-500 text-white"
          >
            Go Back
          </Link>
        </div>
        {
          status === "loading" && <Spinner/>
        }
        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className="text-2xl font-semibold text-center mb-4">
            Add New Course
          </h1>
          <hr className="w-1/2 mx-auto border border-yellow-400 mb-4" />

          {/* Title and Code */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label
                className="text-lg font-semibold text-gray-700 mb-1"
                htmlFor="title"
              >
                Title
              </label>
              <input
                type="text"
                className="w-full p-3 rounded-md border-2 outline-none focus:border-yellow-400 border-gray-400"
                placeholder="Enter course title..."
                name="title"
                id="title"
                value={data.title}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="text-lg font-semibold text-gray-700 mb-1"
                htmlFor="code"
              >
                Course Code
              </label>
              <input
                type="text"
                className="w-full p-3 rounded-md border-2 outline-none focus:border-yellow-400 border-gray-400"
                placeholder="Enter course code..."
                name="code"
                id="code"
                value={data.code}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Subjects and Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label
                className="text-lg font-semibold text-gray-700 mb-1"
                htmlFor="subjects"
              >
                Subjects
              </label>
              <input
                type="text"
                className="w-full p-3 rounded-md border-2 outline-none focus:border-yellow-400 border-gray-400"
                placeholder="Enter subjects, separated by commas..."
                name="subjects"
                id="subjects"
                value={data.subjects}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="text-lg font-semibold text-gray-700 mb-1"
                htmlFor="duration"
              >
                Duration
              </label>
              <select
                className="w-full p-3 rounded-md border-2 outline-none focus:border-yellow-400 border-gray-400"
                name="duration"
                id="duration"
                value={data.duration}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select duration
                </option>
                <option value="1 month">1 Month</option>
                <option value="3 months">3 Months</option>
                <option value="6 months">6 Months</option>
                <option value="1 year">1 Year</option>
              </select>
            </div>
          </div>

          {/* Fees and Discounted Fees */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label
                className="text-lg font-semibold text-gray-700 mb-1"
                htmlFor="fees"
              >
                Course Fees
              </label>
              <input
                type="number"
                className="w-full p-3 rounded-md border-2 outline-none focus:border-yellow-400 border-gray-400"
                placeholder="Enter course fees..."
                name="fees"
                id="fees"
                value={data.fees}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="text-lg font-semibold text-gray-700 mb-1"
                htmlFor="discountedFees"
              >
                Discounted Fees
              </label>
              <input
                type="number"
                className="w-full p-3 rounded-md border-2 outline-none focus:border-yellow-400 border-gray-400"
                placeholder="Max. 500"
                name="discountedFees"
                id="discountedFees"
                value={data.discountedFees}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Minimum Fees and Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label
                className="text-lg font-semibold text-gray-700 mb-1"
                htmlFor="minimumFees"
              >
                Minimum Fees to Pay
              </label>
              <input
                type="number"
                className="w-full p-3 rounded-md border-2 outline-none focus:border-yellow-400 border-gray-400"
                placeholder="Enter minimum fees..."
                name="minimumFees"
                id="minimumFees"
                value={data.minimumFees}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="text-lg font-semibold text-gray-700 mb-1 cursor-pointer"
                htmlFor="images"
              >
                Course Images
                <div className="font-medium p-2 rounded-md border-2 border-gray-400 flex justify-center items-center gap-x-4">
                  {image === null ? (
                    <>
                      <ImageUp size={30} className="text-gray-700" />
                      <span className="font-sans text-gray-400 text-sm">
                        Upload Course Image
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="font-sans text-gray-400 text-sm">
                        {image}
                      </span>
                      <SquareCheckBig size={30} className="text-green-700" />
                    </>
                  )}
                </div>
              </label>
              <input
                type="file"
                className="hidden"
                name="images"
                id="images"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Domain Selection */}
          <div className="flex flex-col">
            <label
              className="text-lg font-semibold text-gray-700 mb-1"
              htmlFor="domain"
            >
              Domain
            </label>
            <select
              className="w-full p-3 rounded-md border-2 outline-none focus:border-yellow-400 border-gray-400"
              name="domain"
              id="domain"
              value={data.domain}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select domain
              </option>
              <option value="Web Development">Web Development</option>
              <option value="App Development">App Development</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Machinelearning">Machine Learning</option>
              <option value="Digital Marketing">Digital Marketing</option>
            </select>
          </div>

          {/* Curriculum and Eligibility */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label
                className="text-lg font-semibold text-gray-700 mb-1"
                htmlFor="curriculum"
              >
                Curriculum
              </label>
              <ReactQuill
                theme="snow"
                value={data.curriculum}
                onChange={(value) => handleQuillChange("curriculum", value)}
              />
            </div>
            <div className="flex flex-col">
              <label
                className="text-lg font-semibold text-gray-700 mb-1"
                htmlFor="eligibility"
              >
                Eligibility Criteria
              </label>
              <ReactQuill
                theme="snow"
                value={data.eligibility}
                onChange={(value) => handleQuillChange("eligibility", value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center items-end p-4 ">
            <button
              type="submit"
              className="w-36 my-4 p-3 hover:bg-yellow-500 bg-yellow-400 text-white rounded-md text-center"
            >
             {status === "loading" ?"Adding" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
