import React, { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTestimonials } from "../../Redux/Actions/testimonialAction";
import Spinner from "../../Components/Spinner/Spinner";
import TestimonialDeleteModal from "./TestimonialDeleteModal";
import { Trash2 } from "lucide-react";

const Testimonials = () => {
  const dispatch = useDispatch();
  const { testimonials, status } = useSelector((state) => state.testimonials);
  const [isOpenDleteMOdal, setIsOpenDeleteModal] = useState(false);
  const [testimonialId, setTestimonialId] = useState(null);

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, []);

  // Handle Delete
  const handleDelete = (id) => {
    setTestimonialId(id);
    setIsOpenDeleteModal(true);
  };

  // const testimonials = [
  //   {

  //     id: 1,
  //     name: "Sarah Johnson",
  //     role: "Marketing Director",
  //     image: "/api/placeholder/80/80",
  //     rating: 5,
  //     comment: "This product has completely transformed how we work. The interface is intuitive and the features are exactly what we needed. Highly recommended!",
  //     company: "Tech Solutions Inc."
  //   },
  //   {
  //     id: 2,
  //     name: "Michael Chen",
  //     role: "Software Engineer",
  //     image: "/api/placeholder/80/80",
  //     rating: 5,
  //     comment: "The best solution I've found for our team's needs. The customer support is outstanding and the regular updates keep making it better.",
  //     company: "DevCraft"
  //   },
  //   {
  //     id: 3,
  //     name: "Emma Wilson",
  //     role: "Product Manager",
  //     image: "/api/placeholder/80/80",
  //     rating: 5,
  //     comment: "We've seen a significant improvement in our workflow since implementing this solution. It's been a game-changer for our team.",
  //     company: "Innovation Labs"
  //   }
  // ];

  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-1">
        {[...Array(rating)].map((_, index) => (
          <Star
            key={index}
            className="w-4 h-4 fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>
    );
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black mb-4">
            What Our Clients Say
          </h2>
          <Link
            to="/Testimonials/form"
           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 float-right"
          >
            Add  Testimonial{" "}
          </Link>
          <p className="text-lg text-black max-w-2xl mx-auto">
            Don't just take our word for it
          </p>
        </div>
        {status === "loading" ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial._id}
                className="bg-[#edba121a] rounded-xl shadow-md p-8 relative hover:shadow-lg transition-shadow duration-300"
              >
                <Quote className="absolute top-6 right-6 w-8 h-8 text-black" />

                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="font-semibold text-black">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-black">{testimonial.role}</p>
                  </div>
                </div>

                <StarRating rating={testimonial.rating} />

                <p className="mt-4 text-black leading-relaxed">
                  {testimonial.description}
                  <Trash2
                    className="cursor-pointer text-red-500 float-right hover:text-red-400"
                    onClick={() => handleDelete(testimonial._id)}
                  />
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <TestimonialDeleteModal
        isOpen={isOpenDleteMOdal}
        onClose={() => setIsOpenDeleteModal(false)}
        id={testimonialId}
      />
    </div>
  );
};

export default Testimonials;
