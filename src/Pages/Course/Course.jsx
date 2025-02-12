import React, { useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../Redux/Actions/courseActions";
import CourseDeleteModal from "./CourseDeleteModal";
import CourseUpdateModal from "./CourseUpdateModal";
import Spinner from "../../Components/Spinner/Spinner";

const CourseList = () => {
  const dispatch = useDispatch();
  const { courses, status } = useSelector((state) => state.courses);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [input, setInput] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  // Fetch courses on mount
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // Handle View, Edit, and Delete actions
  const handleView = (id) => console.log(`Viewing course with id: ${id}`);
  const handleEdit = (course) => {
    setSelectedCourse(course);
    setIsUpdateModalOpen(true);
  };
  const handleDelete = (id) => {
    setSelectedCourse(id);
    setIsDeleteModalOpen(true);
  };

  // Search Filter Function
  const handleSearch = () => {
    if (input.trim()) {
      const filtered = courses.filter(
        (course) =>
          course.title.toLowerCase().includes(input.toLowerCase()) ||
          course.courseCode.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses(courses); // Reset when input is empty
    }
  };

  // Debounce search for better UX
  useEffect(() => {
    const timerId = setTimeout(handleSearch, 500);
    return () => clearTimeout(timerId);
  }, [input, courses]);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Courses</h1>
          <p className="text-lg text-gray-600">Expand your skills</p>

          {/* Styled Search Input */}
          <div className="flex items-center gap-4 p-4">
            <div className="relative w-full max-w-md">
              <input
                className="px-4 py-2 pl-10 rounded-full w-full border border-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 outline-none transition-all duration-300 shadow-sm"
                type="search"
                placeholder="Search courses... By title or course code"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                🔍
              </span>
            </div>
            <Link
              to="/Course/form"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add new Course
            </Link>
          </div>
        </div>

        <div className="p-6 pt-0">
          <div className="relative overflow-x-auto rounded-lg shadow">
            <table className="w-full text-left bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 w-16 font-semibold">Co. Code</th>
                  <th className="p-4 w-48 font-semibold">Title</th>
                  <th className="p-4 font-semibold">Price</th>
                  <th className="p-4 font-semibold">Registration Fees</th>
                  <th className="p-4 font-semibold">Duration</th>
                  <th className="p-4 w-32 font-semibold">Domain</th>
                  <th className="p-4 w-32 font-semibold">Update</th>
                  <th className="p-4 w-32 font-semibold">Delete</th>
                </tr>
              </thead>

              {status === "loading" ? (
                <Spinner />
              ) : filteredCourses.length === 0 && input.trim() !== "" ? (
                <tbody>
                  <tr>
                    <td colSpan="8" className="p-4 text-center text-gray-600">
                      No results found for "{input}"
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {filteredCourses.map((course) => (
                    <tr key={course._id} className="border-b hover:bg-gray-50">
                      <td className="p-4">{course.courseCode}</td>
                      <td className="p-4 font-medium">{course.title}</td>
                      <td className="p-4 text-gray-600">
                        $ {course.courseFees - course.discountendfees}
                      </td>
                      <td className="p-4 text-gray-600">$ {course.minFeesToPay}</td>
                      <td className="p-4 text-gray-600">{course.duration}</td>
                      <td className="p-4 text-gray-600">{course.domain}</td>
                      <td className="p-4">
                        <Button
                          variant="text"
                          size="small"
                          onClick={() => handleEdit(course)}
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
                          onClick={() => handleDelete(course._id)}
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

          {/* Update Modal */}
          {isUpdateModalOpen && (
            <CourseUpdateModal
              course={selectedCourse}
              onClose={() => setIsUpdateModalOpen(false)}
            />
          )}

          {/* Delete Modal */}
          <CourseDeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            id={selectedCourse}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseList;
