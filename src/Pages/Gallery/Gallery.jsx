import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllGallery } from "../../Redux/Actions/galleryAction";
import Spinner from "../../Components/Spinner/Spinner";
import GalleryAddModal from "./GalleryAddModal";
import GalleryDeleteModal from "./GalleryDeleteModal";
import {Images} from 'lucide-react'
const Gallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllGallery());
  }, [dispatch]);

  const { gallery, status } = useSelector((state) => state.gallery);

  const openDeleteModal = (image) => {
    setSelectedImage(image); 
    setTimeout(() => setIsDeleteModalOpen(true), 0); 
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTimeout(() => setSelectedImage(null), 300); 
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-x-4"> <Images/> <span>Gallery</span></h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Image
        </button>
      </div>

      {status === "loading" ? (
        <Spinner />
      ) : gallery.length === 0 ? (
        <h1 className="text-center text-gray-500">No Gallery Found ...</h1>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {gallery.map((image) => (
            <div
              key={image._id}
              className="relative group overflow-hidden rounded-lg"
            >
              <img
                src={image.coverImage}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-10 group-hover:translate-y-0">
                  {image.title}
                </p>
              </div>
              <button
                onClick={() => openDeleteModal(image)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Image Modal */}
      <GalleryAddModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Delete Confirmation Modal */}
      <GalleryDeleteModal 
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        gallery={selectedImage}
      />
    </div>
  );
};

export default Gallery;
