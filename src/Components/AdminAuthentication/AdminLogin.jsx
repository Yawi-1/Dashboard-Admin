import { useState } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "../../Redux/Actions/authActions";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Spinner from "../../Components/Spinner/Spinner";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast("Email is required");
      return;
    }
    if (!password.trim()) {
      toast("Password is required");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        "https://dashboard-backend-rw1e.onrender.com/api/auth/login",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        dispatch(checkAuth());
        navigate("/");
      } else {
        toast.warning(data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border-4 border-yellow-100">
        {loading && <Spinner />}
        
        {/* Decorative elements */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <div className="h-12 w-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-8 text-yellow-600 mt-4">
          Admin Portal
          <div className="mt-2 w-16 h-1 bg-yellow-400 mx-auto rounded-full" />
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-yellow-50 border-2 border-yellow-100 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                placeholder="admin@example.com"
              />
              <svg className="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-yellow-50 border-2 border-yellow-100 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
                placeholder="••••••••"
              />
              <svg className="w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Sign In
          </button>
        </form>

      </div>
    </div>
  );
};

export default AdminLogin;