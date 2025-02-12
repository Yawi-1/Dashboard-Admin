import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "../Reducers/courseReducers";
import { teamReducer } from "../Reducers/TeamMembers";
import serviceReducer from "../Reducers/serviceReducers";
import testimonialReducer from "../Reducers/testimonialReducers";
import expenseReducer from "../Reducers/expenseReducers";
import jobReducer from "../Reducers/jobReducers";
import blogReducer from "../Reducers/BlogReducer";
import galleryReducer from '../Reducers/galleryReducer'
import authReducer from '../Reducers/authReducer'

const store = configureStore({
  reducer: {
    courses: coursesReducer,
    services: serviceReducer,
    team: teamReducer,
    testimonials: testimonialReducer,
    expenses: expenseReducer,
    jobs: jobReducer,
    blogs: blogReducer,
    gallery:galleryReducer,
    auth:authReducer
  },
});

export default store;
