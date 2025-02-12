import React from 'react'
import { deleteTestimonials, fetchTestimonials } from '../../Redux/Actions/testimonialAction';
import { useDispatch,useSelector } from 'react-redux';
import { toast } from 'sonner';



const TestimonialDeleteModal = ({isOpen,onClose,id}) => {
    const dispatch = useDispatch();
    const {status} = useSelector((state)=>state.testimonials)
   const handleDelete = async ()=>{
      try {
          const res = await dispatch(deleteTestimonials(id));
          console.log('res',res)
          if(res.type === 'testimonials/deleteTestimonials/fulfilled') {
            toast.success('Testimonial deleted successfully');
            dispatch(fetchTestimonials());
            onClose();
          }
          else if(res.type === "testimonials/deleteTestimonials/rejected"){
              toast.error('Error Deleted testimonials');
          }
      } catch (error) {
        toast.error('Error deleting testimonial');
      }
   }




     if(!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white text-center p-6 rounded-xl shadow-lg w-96">
        <p className="pb-6 text-xl font-semibold text-gray-800">Are you sure you want to delete this service?</p>
        <div className="flex justify-center gap-6 mt-4">
          <button 
          onClick={handleDelete}
          className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          disabled = {status === "loading"}
          >
           {status === "loading" ? "Loading...." : "  Yes, Delete"} 
          </button>
          <button 
          onClick={onClose}
          className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default TestimonialDeleteModal