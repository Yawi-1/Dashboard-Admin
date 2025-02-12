import React, { useState } from "react";
import { X, Image as ImageIcon } from "lucide-react";
import Spinner from "../../Components/Spinner/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { addGallery } from "../../Redux/Actions/galleryAction";


const GalleryAddModal = ({ onClose, isOpen }) => {
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const { status } = useSelector((state) => state.gallery);
  const dispatch = useDispatch();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setCoverImage(file);
  };

  const handleSubmit = async ()=>{
    if(!title.trim()){
        toast.info("Please enter a title");
        return ;
    }
    if(!coverImage){
        toast.info("Please select a cover image");
        return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("coverImage", coverImage);
    const res = await dispatch(addGallery(formData));
    console.log(res)
    if(res.type === 'gallery/addGallery/fulfilled'){
        toast.success("Gallery added successfully");
        setTitle('');
        setCoverImage(null);
        setImagePreview(null);
        onClose();
    }else{
        toast.error(res.payload.message ||"Failed to add gallery");
    }


  }

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-50 rounded-2xl w-[43%]  max-h-[95vh] overflow-y-auto shadow-2xl transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r">
          <h2 className="text-2xl font-bold text-black">Add New Gallery</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="h-9 w-9 text-red-600 bg-red-300 rounded-full" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-4 space-y-4">
          {/* Title Input */}
          <div className="space-y-1">
            <label
              htmlFor="title"
              className="block text-base	 font-semibold text-gray-500"
            >
              Blog Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#edba12] transition-all"
              placeholder="Enter blog title..."
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-base font-semibold text-gray-500">
              Blog Image
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="w-full flex flex-col items-center px-6 py-8 bg-gray-50 rounded-xl border-2 border-dashed border-yellow-300 cursor-pointer hover:bg-gray-100 transition-colors">
                {imagePreview ? (
                  <div className="relative w-full">
                    <img
                      src={imagePreview}
                      alt="Image preview"
                      className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setImagePreview(null);
                        setCoverImage(null);
                      }}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                    >
                      <X className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <ImageIcon className="w-12 h-12 text-yellow-400 mb-3" />
                    <div className="flex flex-col items-center">
                      <span className="text-sm text-black">
                        Click Image Upload
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-black">
                      PNG, JPG, BMP, WebP
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  onClick={(e) => (e.target.value = null)} // Reset input
                />
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#edba12] to-[#e2b931] rounded-lg hover:opacity-90 transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
      {status === "loading" && <Spinner />}
    </div>
  );
};

export default GalleryAddModal;
