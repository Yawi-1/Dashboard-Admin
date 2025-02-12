const initialState = {
  isAuthenticated: false,
  loading: true,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_AUTH_SUCCESS":
      return { ...state, isAuthenticated: true, loading: false };
    case "CHECK_AUTH_FAILURE":
      return { ...state, isAuthenticated: false, loading: false };
    default:
      return state;
  }
};

export default authReducer;
