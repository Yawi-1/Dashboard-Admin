import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from "sonner";
import { Upload, AlertCircle, X } from 'lucide-react';
import { createTeam,getAllTeamMembers } from '../../Redux/Actions/TeamAction.js';
                                        
const ProfileForm = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    name: '',
    designation: '',
    yearOfExperience: '',
    image: null,
    imageUrl: '/api/placeholder/128/128'
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Add file size validation (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          image: 'Image size must be less than 5MB'
        }));
        return;
      }
      
      // Add file type validation
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          image: 'Please upload a valid image file (JPEG, PNG, or GIF)'
        }));
        return;
      }

      setFormState(prev => ({
        ...prev,
        image: file,
        imageUrl: URL.createObjectURL(file)
      }));
      
      // Clear any previous image errors
      setErrors(prev => ({
        ...prev,
        image: undefined
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear the specific error when the user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formState.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formState.designation?.trim()) {
      newErrors.designation = 'Designation is required';
    }
    
    if (!formState.yearOfExperience) {
      newErrors.yearOfExperience = 'Experience is required';
    } else if (formState.yearOfExperience < 0 || formState.yearOfExperience > 100) {
      newErrors.yearOfExperience = 'Experience must be between 0 and 100 years';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    setIsLoading(true);
  
    try {
      const formData = new FormData();
      
      // Update field names to match backend expectations
      formData.append('name', formState.name.trim());
      formData.append('designation', formState.designation.trim());
      formData.append('yearOfExperience', String(formState.yearOfExperience));
      
      if (formState.image) {
        formData.append('coverImage', formState.image);
      }
  
      const response = await dispatch(createTeam(formData));
  
      if (response.status === 'succeeded') {
        toast.success("Team member added successfully!");
        dispatch(getAllTeamMembers())
        onClose();
      } else {
        const errorMsg = response.error || "Failed to add team member. Please try again.";
        toast.error(errorMsg);
        setErrors(prev => ({
          ...prev,
          submit: errorMsg
        }));
      }
    } catch (error) {
      console.error('Form Submission Error:', error);
      const errorMessage = error.response?.data?.message 
        || error.message 
        || "An unexpected error occurred. Please try again.";
      
      toast.error(errorMessage);
      setErrors(prev => ({
        ...prev,
        submit: errorMessage
      }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (formState.imageUrl && formState.imageUrl !== '') {
        URL.revokeObjectURL(formState.imageUrl);
      }
    };
  }, [formState.imageUrl]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 disabled:opacity-50"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Team Member</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <img
                  src={formState.imageUrl}
                  alt="Profile Preview"
                  className="w-32 h-32 rounded-full border-4 border-gray-100 object-cover"
                />
                <label
                  htmlFor="imageUpload"
                  className={`absolute bottom-0 right-0 bg-gradient-to-r from-yellow-500 to-yellow-600 p-2 rounded-full cursor-pointer 
                    hover:bg-yellow-500 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Upload className="h-5 w-5 text-white" />
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={isLoading}
                  accept="image/*"
                />
              </div>
              {errors.image && (
                <div className="flex items-center mt-2 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.image}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                disabled={isLoading}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none 
                  transition-colors disabled:opacity-50 disabled:bg-gray-100
                  ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter team member's full name"
                maxLength={100}
              />
              {errors.name && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.name}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">
                Designation
              </label>
              <input
                type="text"
                id="designation"
                name="designation"
                value={formState.designation}
                onChange={handleInputChange}
                disabled={isLoading}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none 
                  transition-colors disabled:opacity-50 disabled:bg-gray-100
                  ${errors.designation ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter designation"
                maxLength={100}
              />
              {errors.designation && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.designation}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="yearOfExperience" className="block text-sm font-medium text-gray-700 mb-1">
                Years of Experience
              </label>
              <input
                type="number"
                id="yearOfExperience"
                name="yearOfExperience"
                value={formState.yearOfExperience}
                onChange={handleInputChange}
                disabled={isLoading}
                min="0"
                max="100"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none 
                  transition-colors disabled:opacity-50 disabled:bg-gray-100
                  ${errors.yearOfExperience ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter years of experience"
              />
              {errors.yearOfExperience && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.yearOfExperience}
                </div>
              )}
            </div>

            {errors.submit && (
              <div className="flex items-center text-red-500 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.submit}
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg 
                  hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-500 
                  transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Adding...' : 'Add Member'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;