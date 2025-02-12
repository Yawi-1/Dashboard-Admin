import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTeamMembers, deleteTeamMember } from '../../Redux/Actions/TeamAction.js';
import { ChevronUp, ChevronDown, Users, Trash2 } from 'lucide-react';
import { selectTeamMembers, selectTeamLoading, selectTeamError } from '../../Redux/Selectors/TeamMembers.js';
import ProfileForm from './TeamPopup.jsx';
import DeleteConfirmationPopup from './TeamDelete.jsx';
import { toast } from 'sonner';
import Spinner from '../../Components/Spinner/Spinner.jsx';


const SortIcon = ({ field, sortField, sortDirection }) => {
  if (sortField !== field) {
    return <ChevronUp className="w-4 h-4 opacity-0 group-hover:opacity-50" />;
  }
  return sortDirection === "asc" ? 
    <ChevronUp className="w-4 h-4" /> : 
    <ChevronDown className="w-4 h-4" />;
};

function TeamMemberList() {
  const dispatch = useDispatch();
  const teamMembers = useSelector(selectTeamMembers);
  const loading = useSelector(selectTeamLoading);
  const error = useSelector(selectTeamError);
  const [popupOpen, setPopupOpen] = useState(false);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);


  useEffect(() => {
    dispatch(getAllTeamMembers());
  }, [dispatch]);


  const handleDelete = useCallback((member) => {
    setMemberToDelete(member);
    setDeletePopupOpen(true);
  }, []);

  const handleCancelDelete = useCallback(() => {
    setDeletePopupOpen(false);
    setMemberToDelete(null);
  }, []);

  // New function to handle delete confirmation
  const handleConfirmDelete = useCallback(async () => {
    if (!memberToDelete) return;
  
    try {
      setIsDeleting(true);
      const loadingToast = toast.loading('Deleting team member...');
      
      await dispatch(deleteTeamMember(memberToDelete.id));
      
      toast.dismiss(loadingToast);
      toast.success(`${memberToDelete.name} has been deleted successfully!`);
      dispatch(getAllTeamMembers());
      
      // Close the popup and reset the state
      setDeletePopupOpen(false);
      setMemberToDelete(null);
    } catch (error) {
      console.error('Failed to delete team member:', error);
      toast.error(error?.message || 'Failed to delete team member');
    } finally {
      setIsDeleting(false);
    }
  }, [memberToDelete, dispatch]);


  const sortData = useCallback((data, field, direction) => {
    if (!data || !Array.isArray(data)) return [];

    return [...data].sort((a, b) => {
      if (field === 'yearOfExperience') {
        return direction === "asc"
          ? Number(a[field]) - Number(b[field])
          : Number(b[field]) - Number(a[field]);
      }

      const aValue = a[field]?.toString().toLowerCase() ?? '';
      const bValue = b[field]?.toString().toLowerCase() ?? '';

      return direction === "asc" 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, []);

  const processedData = useMemo(() => {
    if (!teamMembers || !Array.isArray(teamMembers)) return [];
    
    return teamMembers.map(member => ({
      id: member._id || member.id,
      name: member.name || 'Unknown',
      designation: member.designation || 'Not specified',
      yearOfExperience: member.yearOfExperience || 0,
      coverImage: member.coverImage || member.imageUrl 
    }));
  }, [teamMembers]);

  const sortedData = useMemo(() => {
    if (!processedData.length) return [];
    if (!sortField) return processedData;
    return sortData(processedData, sortField, sortDirection);
  }, [processedData, sortField, sortDirection, sortData]);

  if (loading) {
    return (
     <Spinner/>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">
          Error: {error.message || 'Failed to load team members'}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8 text-yellow-400" />
          <h2 className="text-3xl font-semibold text-black">Team Profiles</h2>
        </div>
        <button 
          onClick={() => setPopupOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Team
        </button>
      </div>

      {!sortedData.length ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">No team members found</div>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left border-b">
                    <div className="text-sm font-medium text-gray-700">Photo</div>
                  </th>
                  {[
                    { field: 'name', label: 'Name' },
                    { field: 'designation', label: 'Designation' },
                    { field: 'yearOfExperience', label: 'Years of Experience' }
                  ].map(({ field, label }) => (
                    <th 
                      key={field}
                      className="px-4 py-3 text-left cursor-pointer group border-b"
                      onClick={() => handleSort(field)}
                    >
                      <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                        {label}
                        <SortIcon field={field} sortField={sortField} sortDirection={sortDirection} />
                      </div>
                    </th>
                  ))}
                  <th className="px-4 py-3 text-left border-b">
                    <div className="text-sm font-medium text-gray-700">Actions</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedData.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img 
                          src={member.coverImage}
                          alt={`${member.name}'s photo`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/api/placeholder/40/40';
                            e.target.alt = 'Default profile photo';
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{member.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{member.designation}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{member.yearOfExperience} years</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(member)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete team member"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ProfileForm
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
      />

      <DeleteConfirmationPopup 
        isOpen={deletePopupOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        itemName={memberToDelete ? memberToDelete.name : 'team member'}
      />
    </div>
  );
}

export default TeamMemberList;