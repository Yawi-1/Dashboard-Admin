import React, { useRef, useState } from "react";
import { toast } from "sonner";
import { Settings,SquareCheckBig,ImageUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { addTestimonials } from "../../Redux/Actions/testimonialAction";
import Spinner from '../../Components/Spinner/Spinner'
const TestimonialsForm = () => {
  const dispatch = useDispatch();
  const {status} = useSelector((state)=>state.testimonials);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    role: "",
    image: null,
    rating: "",
  });

  const nameRef = useRef();
  const descriptionRef = useRef();
  const roleRef = useRef();
  const ratingRef = useRef();

  const handleFileChange = async (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validation
      if (!formData.name.trim()) {
        toast.error("Name is required");
        nameRef.current.focus();
        return;
      }
      if (!formData.description.trim()) {
        toast.error("Description is required");
        descriptionRef.current.focus();
        return;
      }
      if (!formData.role.trim()) {
        toast.error("Role is required");
        roleRef.current.focus();
        return;
      }
      if (!formData.rating.trim() || formData.rating < 1 || formData.rating > 5) {
        toast.error("Rating must be between 1 and 5");
        ratingRef.current.focus();
        return;
      }
      if (!formData.image) {
        toast.error("Please upload an image");
        return;
      }

        const data = new FormData();
        data.append('image', formData.image);
        data.append('name', formData.name);
        data.append('role', formData.role);
        data.append('description', formData.description);
        data.append('rating', formData.rating);
        
        
      // Handle form submission (for example, send it to an API)
       const res = await dispatch(addTestimonials(data));
      toast.success("Testimonials added  successfully!");

      // Reset form
      setFormData({
        name: "",
        description: "",
        role: "",
        image: null,
        rating: "",
      });
    } catch (error) {
      console.log(error)
      toast.error("Failed to submit the form");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-row items-center justify-between p-6">
        <h2 className="text-2xl font-semibold flex items-center">
          <Settings className="w-6 h-6 mr-2 ml-4 text-yellow-600" />
          Testimonial Form
        </h2>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-1/2 mx-auto p-6 rounded shadow shadow-yellow-400"
        encType="multipart/form-data"
      >
        <Link to='/Testimonials' className="float-right  bg-blue-600 px-4 py-2 text-white rounded-md font-semibold m-4">Go Back</Link>
        <h1 className="text-2xl font-semibold text-center my-2">Add New Testimonial</h1>
        <hr className="w-1/2 mx-auto border border-yellow-400" />

        {/* Name Input */}
        <div className="mb-4">
          <label htmlFor="name" className="block my-2 text-lg font-semibold text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            ref={nameRef}
            className="w-full p-3 rounded-md border-2 outline-none focus:border-yellow-400 border-gray-400"
            placeholder="Enter your name..."
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label htmlFor="description" className="block my-2 text-lg font-semibold text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            ref={descriptionRef}
            className="w-full p-3 rounded-md border-2 outline-none focus:border-yellow-400 border-gray-400"
            placeholder="Enter a description..."
            rows="3"
          ></textarea>
        </div>

        {/* Role Input */}
        <div className="mb-4">
          <label htmlFor="role" className="block my-2 text-lg font-semibold text-gray-700">
            Role
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            ref={roleRef}
            className="w-full p-3 rounded-md border-2 outline-none focus:border-yellow-400 border-gray-400"
            placeholder="Enter your role..."
          />
        </div>

        {/* Image Input */}
        <div className="mb-4">
        <label
                className="text-lg  font-semibold text-gray-700 mb-1 cursor-pointer"
                htmlFor="image"
              >
                Testimonial Image
                <div className="font-medium p-2 mt-2  rounded-md border-2 border-gray-400 flex justify-center items-center gap-x-4">
                  {formData.image === null ? (
                    <>
                      <ImageUp size={30} className="text-gray-700" />
                      <span className="font-sans text-gray-400 text-sm">
                        Upload Course Image
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="font-sans text-gray-400 text-sm">
                        {formData.image.name}
                      </span>
                      <SquareCheckBig size={30} className="text-green-700" />
                    </>
                  )}
                </div>
              </label>
             
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full p-3 rounded-md border-2 outline-none focus:border-yellow-400 border-gray-400 hidden"
          />
        </div>

        {/* Rating Input */}
        <div className="mb-4">
          <label htmlFor="rating" className="block my-2 text-lg font-semibold text-gray-700">
            Rating (1-5)
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            ref={ratingRef}
            min="1"
            max="5"
            className="w-full p-3 rounded-md border-2 outline-none focus:border-yellow-400 border-gray-400"
            placeholder="Enter a rating..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-between items-center font-semibold p-2">
          <button
            type="submit"
            className="w-36 my-4 p-3 hover:bg-yellow-500 bg-yellow-400 text-white rounded-md border text-center"
            disabled ={status === "loading"}
          >
            {status === "loading" ? 'Loading' :'Submit'}
          </button>
        </div>
      </form>
      {status === "loading" && <Spinner/>}
    </div>
  );
};

export default TestimonialsForm