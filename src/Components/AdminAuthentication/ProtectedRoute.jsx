import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth } from "../../Redux/Actions/authActions";
import Spinner from "../Spinner/Spinner";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  // If already logged out, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
