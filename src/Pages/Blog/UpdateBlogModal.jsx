import React, { useState, useEffect } from "react";
import { X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { updateBlog } from "../../Redux/Actions/BlogAction";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../Components/Spinner/Spinner";

const BlogUpdateModal = ({ isOpen, onClose, blogData }) => {
  console.log(blogData)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (blogData) {
      setTitle(blogData.title);
      setDescription(blogData.description);
      setContent(blogData.content);
      setCategory(blogData.category);
    }
  }, [blogData]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.info("File size must be less than 10MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.info("Please upload an image file");
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setImageFile(file);
    }
  };

  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.blogs);

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.info("Please enter a title");
      return;
    }
    if (!description.trim()) {
      toast.info("Please enter a description");
      return;
    }
    if (!content) {
      toast.info("Please enter content");
      return;
    }
    if (!category.trim()) {
      toast.info("Please enter a category");
      return;
    }

    const formData = {
        title,
        description,
        content,
        category,
        coverImage: imageFile || blogData.coverImage,
    }

    const res = await dispatch(updateBlog({blogId: blogData._id, formData}));
    if (res.type === "blog/updateBlog/fulfilled") {
      toast.success("Blog Updated Successfully");
      onClose();
    } else {
      toast.error("Error Updating Blog");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-50 rounded-2xl w-[43%] max-h-[95vh] overflow-y-auto shadow-2xl transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r">
          <h2 className="text-2xl font-bold text-black">Update Blog</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X className="h-9 w-9 text-red-600 bg-red-300 rounded-full" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-4 space-y-4">
          <div className="space-y-1">
            <label className="block text-base font-semibold text-gray-500">Blog Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#edba12]"
            />
          </div>
          
          <div className="space-y-1">
            <label className="block text-base font-semibold text-gray-500">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#edba12]"
            />
          </div>
          
          <div className="space-y-1">
            <label className="block text-base font-semibold text-gray-500">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#edba12]"
            />
          </div>
          
          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-base font-semibold text-gray-500">Blog Image</label>
            <div className="flex items-center justify-center w-full">
              <label className="w-full flex flex-col items-center px-6 py-8 bg-gray-50 rounded-xl border-2 border-dashed border-yellow-300 cursor-pointer hover:bg-gray-100">
                {imagePreview ? (
                  <div className="relative w-full">
                    <img src={imagePreview} alt="Blog preview" className="w-full h-48 object-cover rounded-lg shadow-md" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <ImageIcon className="w-12 h-12 text-yellow-400 mb-3" />
                    <span className="text-sm text-black">Click to upload</span>
                  </div>
                )}
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>
          </div>
          
          {/* Quill Editor */}
          <div className="space-y-2">
            <label className="block text-base font-semibold text-gray-500">Blog Content</label>
            <ReactQuill theme="snow" value={content} onChange={setContent} className="h-[200px] rounded-xl" />
          </div>
        </div>

        <div className="flex justify-end gap-4 p-6 border-t bg-gray-50">
          <button onClick={onClose} className="px-6 py-2.5 text-gray-700 border rounded-lg">Cancel</button>
          <button onClick={handleSubmit} className="px-6 py-2.5 text-white bg-[#edba12] rounded-lg">Update</button>
        </div>
      </div>
      {status === "loading" && <Spinner />}
    </div>
  );
};

export default BlogUpdateModal;
 