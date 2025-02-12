import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { lazy, Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkAuth } from "./Redux/Actions/authActions";
import SideLayout from "./SideHeader";
import AdminLogin from "./Components/AdminAuthentication/AdminLogin";
import ProtectedRoute from "./Components/AdminAuthentication/ProtectedRoute";

// Lazy-loaded components
const Dashboard = lazy(() => import("./Components/Dashboad/Dashboad"));
const AdminDashboard = lazy(() => import("./Components/Staff ManagerDasboad/AdminDashboad"));
const ServiceTable = lazy(() => import("./Pages/Service/ServiceTable"));
const ServiceForm = lazy(() => import("./Pages/Service/ServiceForm"));
const SimpleTable = lazy(() => import("./Pages/TeamP/TeamProtiles"));
const AboutCompany = lazy(() => import("./Pages/AboutCompany/AboutCompany"));
const CompanyProfileForm = lazy(() => import("./Pages/AboutCompany/CompanyProfileForm"));
const CourseList = lazy(() => import("./Pages/Course/Course"));
const CourseForm = lazy(() => import("./Pages/Course/CourseForm"));
const Expense = lazy(() => import("./Pages/Expense/Expense"));
const ExpenseForm = lazy(() => import("./Pages/Expense/ExpenseForm"));
const StyledTable = lazy(() => import("./Pages/Blog/BlogAll"));
const Testimonials = lazy(() => import("./Pages/Testimonials/Testimoials"));
const TestimonialForm = lazy(() => import("./Pages/Testimonials/TestimonialsForm"));
const RegistrationForm = lazy(() => import("./Pages/RegistrationsF/Registrations"));
const NoticeBoad = lazy(() => import("./Pages/Notice-Boad/NoticeBoad"));
const UpdateJob = lazy(() => import("./Pages/Update-of-Job/UpdateJob"));
const JobForm = lazy(() => import("./Pages/Update-of-Job/JobForm"));
const Gallery = lazy(() => import("./Pages/Gallery/Gallery"));
const Inquiries = lazy(() => import("./Pages/Inquiries/Inquiries"));

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Check authentication status on mount
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect to dashboard if already authenticated */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <AdminLogin />} />

        {/* Protected routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex">
                <SideLayout />
                <div className="flex-1">
                  <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/StaffManeger" element={<AdminDashboard />} />
                      <Route path="/Service" element={<ServiceTable />} />
                      <Route path="/Service/form" element={<ServiceForm />} />
                      <Route path="/Team" element={<SimpleTable />} />
                      <Route path="/About" element={<AboutCompany />} />
                      <Route path="/About/form" element={<CompanyProfileForm />} />
                      <Route path="/Course" element={<CourseList />} />
                      <Route path="/Course/form" element={<CourseForm />} />
                      <Route path="/Expense" element={<Expense />} />
                      <Route path="/Expense/form" element={<ExpenseForm />} />
                      <Route path="/Blog" element={<StyledTable />} />
                      <Route path="/Testimonials" element={<Testimonials />} />
                      <Route path="/Testimonials/form" element={<TestimonialForm />} />
                      <Route path="/Registrations" element={<RegistrationForm />} />
                      <Route path="/Notice-Board" element={<NoticeBoad />} />
                      <Route path="/Job" element={<UpdateJob />} />
                      <Route path="/Job/form" element={<JobForm />} />
                      <Route path="/Gallery" element={<Gallery />} />
                      <Route path="/Inquiries" element={<Inquiries />} />
                    </Routes>
                  </Suspense>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster  position="top-center" richColors />
    </BrowserRouter>
  );
}

export default App;
