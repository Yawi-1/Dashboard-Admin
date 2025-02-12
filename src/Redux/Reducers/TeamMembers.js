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
                     
const initialState = {
  teams: [],
  members: [],
  selectedTeamMember: null,
  loading: false,
  error: null,
  currentTeam: null

};
                          
export const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    // Create Team
    case CREATE_TEAM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

      case CREATE_TEAM_SUCCESS:
        return {
          ...state,
          loading: false,
          teams: [...state.teams, action.payload],
          error: null
        };
                             
      case CREATE_TEAM_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
    // Get All Team Members
    case GET_ALLTEAMMEMBERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case GET_ALLTEAMMEMBERS_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        teamMembers: action.payload ,
        error: null
      };
      
      case GET_ALLTEAMMEMBERS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
    // Get Team Member By ID
    case GET_TEAMMEMBERBYID_REQUEST:
      return { ...state, loading: true };
    case GET_TEAMMEMBERBYID_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        selectedTeamMember: action.payload 
      };
    case GET_TEAMMEMBERBYID_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Delete Team Member
    case DELETE_TEAMMEMBER_REQUEST:
      return { ...state, loading: true };
    case DELETE_TEAMMEMBER_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        teamMembers: state.teamMembers.filter(member => member.id !== action.payload)
      };
    case DELETE_TEAMMEMBER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Update Team Member
    case UPDATE_TEAMMEMBER_REQUEST:
      return { ...state, loading: true };
    case UPDATE_TEAMMEMBER_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        teamMembers: state.teamMembers.map(member => 
          member.id === action.payload.id ? action.payload : member
        )
      };
    case UPDATE_TEAMMEMBER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

