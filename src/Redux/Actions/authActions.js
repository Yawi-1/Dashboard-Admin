
export const checkAuth = () => async (dispatch) => {
  try {
    const res = await fetch("https://dashboard-backend-rw1e.onrender.com/api/auth/check-auth", {
      method: "GET",
      credentials: "include", // Ensures cookies are sent
    });

    const data = await res.json();

    if (data.isAuthenticated) {
      dispatch({ type: "CHECK_AUTH_SUCCESS", payload: true });
    } else {
      dispatch({ type: "CHECK_AUTH_FAILURE", payload: false });
    }
  } catch (error) {
    dispatch({ type: "CHECK_AUTH_FAILURE", payload: false });
  }
};
