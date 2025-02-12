import axios from 'axios';
import {
  CREATE_TEAM_REQUEST,
  CREATE_TEAM_SUCCESS,
  CREATE_TEAM_FAILURE,
  GET_ALLTEAMMEMBERS_REQUEST,
  GET_ALLTEAMMEMBERS_SUCCESS,
  GET_ALLTEAMMEMBERS_FAILURE,
  GET_TEAMMEMBERBYID_REQUEST,
  GET_TEAMMEMBERBYID_SUCCESS,
  GET_TEAMMEMBERBYID_FAILURE,
  DELETE_TEAMMEMBER_REQUEST,
  DELETE_TEAMMEMBER_SUCCESS,
  DELETE_TEAMMEMBER_FAILURE,
  UPDATE_TEAMMEMBER_REQUEST,
  UPDATE_TEAMMEMBER_SUCCESS,
  UPDATE_TEAMMEMBER_FAILURE
} from '../Constants/TeamMembers.js';


const BASE_URL = 'https://dashboard-backend-rw1e.onrender.com/api/v1/team';


const createTeam = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_TEAM_REQUEST });

    if (!(formData instanceof FormData)) {
      throw new Error('Invalid form data format');
    }

    const response = await axios.post(`${BASE_URL}/Create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    dispatch({ 
      type: CREATE_TEAM_SUCCESS, 
      payload: response.data.data || response.data // Ensure we're getting the correct data structure
    });

    return { 
      status: 'succeeded', 
      data: response.data 
    };
  } catch (error) {
    console.error('Create team error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });

    dispatch({ 
      type: CREATE_TEAM_FAILURE, 
      payload: error.response?.data?.message || error.message 
    });

    return {
      status: 'failed',
      error: error.response?.data?.message || error.message || 'Failed to create team member'
    };
  }
};

const getAllTeamMembers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALLTEAMMEMBERS_REQUEST });
    
    const response = await axios.get(`${BASE_URL}/getAllTeamMembers`);
    
    const teamMembers = Array.isArray(response.data?.data) ? response.data.data :
                       Array.isArray(response.data?.teamMembers) ? response.data.teamMembers :
                       Array.isArray(response.data?.team) ? response.data.team :
                       Array.isArray(response.data) ? response.data :
                       [];

    dispatch({
      type: GET_ALLTEAMMEMBERS_SUCCESS,
      payload: teamMembers
    });

    return teamMembers;
  } catch (error) {
    dispatch({
      type: GET_ALLTEAMMEMBERS_FAILURE,
      payload: error.response?.data?.message || error.message
    });
    throw error;
  }
};

const getTeamMemberById = (id) => async (dispatch) => {
  try {
    if (!id) {
      throw new Error('Team member ID is required');
    }

    dispatch({ type: GET_TEAMMEMBERBYID_REQUEST });
    
    const response = await axios.get(`${BASE_URL}/getTeamMemberById/${id}`);
    
    dispatch({
      type: GET_TEAMMEMBERBYID_SUCCESS,
      payload: {
        teamMember: response.data.teamMembers,
        count: response.data.count
      }
    });

    return response.data.teamMembers;
  } catch (error) {
    dispatch({
      type: GET_TEAMMEMBERBYID_FAILURE,
      payload: error.response?.data?.message || error.message
    });
    throw error;
  }
};

const deleteTeamMember = (id) => async (dispatch) => {
  try {
    if (!id) {
      throw new Error('Team member ID is required');
    }

    dispatch({ type: DELETE_TEAMMEMBER_REQUEST });
    
    const response = await axios.delete(`${BASE_URL}/deleteTeamMember/${id}`);

    if (response.data) {
      dispatch({ 
        type: DELETE_TEAMMEMBER_SUCCESS,
        payload: id
      });

      return { success: true };
    } else {
      throw new Error('Failed to delete team member');
    }
  } catch (error) {
    dispatch({ 
      type: DELETE_TEAMMEMBER_FAILURE,
      payload: error.message || 'Failed to delete team member'
    });
    throw error;
  }
};

const updateTeamMember = (id, memberData) => async (dispatch) => {
  try {
    if (!id) {
      throw new Error('Team member ID is required');
    }

    if (!memberData || Object.keys(memberData).length === 0) {
      throw new Error('Member data is required');
    }

    dispatch({ type: UPDATE_TEAMMEMBER_REQUEST });
    
    const response = await axios.put(`${BASE_URL}/updateTeamMember/${id}`, memberData); {
      
    }
    
   


    dispatch({
      type: UPDATE_TEAMMEMBER_SUCCESS,
      payload: response.data
    });

    return response.data;
  } catch (error) {
    dispatch({
      type: UPDATE_TEAMMEMBER_FAILURE,
      payload: error.response?.data?.message || error.message
    });
    throw error;
  }
};

export {
  createTeam,
  getAllTeamMembers,
  getTeamMemberById,
  deleteTeamMember,
  updateTeamMember
};