import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Eye, Heading1, Pencil, Trash2 } from "lucide-react";
import { FaBlog } from "react-icons/fa6";
import BlogPopup from "../Blog/AddPopup";
import Spinner from "../../Components/Spinner/Spinner.jsx";
import { fetchBlogs } from "../../Redux/Actions/BlogAction.js";
import { Button } from "@mui/material";
import BlogDeleteModal from "./BlogDeleteModal.jsx";
import UpdateBlogModal from "./UpdateBlogModal.jsx";

const BlogManagement = () => {
  const dispatch = useDispatch();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isUpdate,setIsUpdate] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const { blogs, status, error } = useSelector((state) => state.blogs);

  const handleDelete = (blog) => {
    setIsDelete(true);
    setSelectedBlog(blog);
  };

  const handleEdit = (blog)=>{
    setIsUpdate(true);
    setSelectedBlog(blog)
  }

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <div className="flex items-center gap-2">
          <FaBlog className="text-3xl text-yellow-600" />
          <h2 className="text-2xl font-semibold text-gray-900">
            Content Blog Management
            {blogs.length > 0 && (
              <span className="text-sm text-gray-500 ml-2">
                (Total: {blogs.length})
              </span>
            )}
          </h2>
        </div>
        <button
         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setIsPopupOpen(true)}
      
        >
          Add Blog
        </button>
      </div>

      {/* Content Section */}
      {status === "loading" ? (
        <Spinner />
      ) : error ? (
        <div className="w-full p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="p-4 border">S.No</th>
                <th className="p-4 border">Title</th>
                <th className="p-4 border">Category</th>
                <th className="p-4 border">Description</th>
                <th className="p-4 border">Content</th>
                <th className="p-4 border text-center">Actions</th>
              </tr>
            </thead>
           {blogs.length === 0 ? <tbody className="text-center">
            <td className="text-2xl font-semibold p-6" colSpan={6}>
            No Blogs Found ....
            </td>
            </tbody> : (
               <tbody>
               {blogs &&
                 blogs.map((blog, index) => (
                   <tr key={blog._id} className="border hover:bg-gray-50">
                     <td className="p-4 border">{index + 1}</td>
                     <td className="p-4 border font-medium">{blog.title}</td>
                     <td className="p-4 border text-gray-600">
                       {blog.category}
                     </td>
                     <td className="p-4 border text-gray-600">
                       {blog.description}
                     </td>
                     <td className="p-4 border text-gray-600">
                       <div
                         className="ql-editor"
                         dangerouslySetInnerHTML={{ __html: blog.content }}
                       ></div>
                     </td>
 
                     <td className="p-4 border text-center">
                       <Button variant="text" size="small" className="mr-2" onClick={()=>handleEdit(blog)}>
                         <Pencil className="h-4 w-4" />
                       </Button>
                       <Button
                         variant="text"
                         size="small"
                         className="text-red-600 hover:text-red-700"
                         onClick={() => handleDelete(blog)}
                       >
                         <Trash2 className="h-4 w-4" />
                       </Button>
                     </td>
                   </tr>
                 ))}
             </tbody>
           )}
         

          </table>
          <BlogDeleteModal
            isOpen={isDelete}
            onClose={() => setIsDelete(false)}
            blog={selectedBlog}
          />
          <UpdateBlogModal
          isOpen={isUpdate}
          onClose={() => setIsUpdate(false)}
          blogData={selectedBlog}
          />
        </div>
      )}

      <BlogPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        blog={selectedBlog}
      />
    </div>
  );
};

export default BlogManagement;
