import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBlog } from "react-icons/fa";
import { SiCoursera } from "react-icons/si";
import { MdMiscellaneousServices } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { AiOutlineTeam } from "react-icons/ai";
import { GrGallery } from "react-icons/gr";
import { FaRegNoteSticky } from "react-icons/fa6";
import { MdAppRegistration } from "react-icons/md";
import { MdOutlineUpdate } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { toast } from "sonner";

import {
  ChevronRight,
  ChevronLeft,
  LayoutDashboard,
  HandCoins,
  TriangleAlert,
  Info,
} from "lucide-react";
const navigationItems = [
  { id: "/", name: "Dashboard", icon: LayoutDashboard },
  { id: "/StaffManeger", name: "Staff Manager Dashboard", icon: RiAdminFill },
  { id: "/Service", name: "Service Management", icon: MdMiscellaneousServices },
  { id: "/Team", name: "Team(Profiles)", icon: AiOutlineTeam },
  { id: "/About", name: "About Company", icon: Info },
  { id: "/Course", name: "Course", icon: SiCoursera },
  { id: "/expense", name: "Expense", icon: HandCoins },
  { id: "/Gallery", name: "Gallery", icon: GrGallery },
  { id: "/Blog", name: "Content Blog ", icon: FaBlog },
  { id: "/Testimonials", name: "Testimonials", icon: FaRegNoteSticky },
  { id: "/Registrations", name: "Registrations", icon: MdAppRegistration },
  { id: "/Notice-Board", name: "Notice Board", icon: FaChalkboardTeacher },
  { id: "/Inquiries", name: "Inquiries", icon: TriangleAlert },
  { id: "/Job", name: "Job Board", icon: MdOutlineUpdate },
];

const SideLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await fetch("https://dashboard-backend-rw1e.onrender.com/api/auth/logout", {
        method: "GET",
        credentials: "include", 
      });
      toast.info("Logged out successfully!");
      setTimeout(()=>{
        window.location.href = '/login'
      },500)
    } catch (error) {
      console.error("Logout error", error);
    }
  };
  

  return (
    <aside
      className={`
      relative flex flex-col
      transition-all duration-300 ease-in-out
      bg-white shadow-lg
      rounded-tr-3xl rounded-br-3xl
      ${isSidebarCollapsed ? "w-36" : "w-72"}
    `}
    >
      <div className="flex justify-center items-center p-4 ">
        <img
          className={`
            transition-all duration-300
            ${isSidebarCollapsed ? "w-16 h-14" : "w-26 h-20"}
            object-contain
          `}
          src="https://th.bing.com/th/id/R.1a551aa4cba59342dff2decfbaa9c8dd?rik=KQTDhx1ZUAAfjA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2flogo-template-png-logo-templates-1655.png&ehk=9MRokJPqMM6lr6AsMn50qqBGQgGuPYXFuTzMFbKjOa8%3d&risl=&pid=ImgRaw&r=0"
          alt="Logo"
        />
      </div>

      <button
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        className="absolute -right-3 top-3  bg-gradient-to-r  from-[#edba12] to-yellow-700 rounded-full p-2.5 shadow-lg hover:bg-[#edba12] transition-colors"
        aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isSidebarCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      <nav className="mt- flex-grow px-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavigation(item.id)}
                className={`
                  w-full p-3 flex items-center gap-3
                  transition-all duration-200
                  rounded-s-lg
                  ${
                    location.pathname === item.id
                      ? "text-black bg-gradient-to-r  from-[#edba12] to-yellow-600 shadow-md"
                      : "text-black hover:bg-[#edba12d0] hover:text-black hover:shadow-md"
                  }
                  ${isSidebarCollapsed ? "justify-center" : "justify-start"}
                `}
              >
                <item.icon className="w-6 h-6" />
                {!isSidebarCollapsed && (
                  <span className="text-sm font-medium">{item.name}</span>
                )}
              </button>
            </li>
          ))}
          <li>
            <button
            onClick={handleLogout}
              className={` w-full p-3 flex items-center gap-3
                  transition-all duration-200
                  rounded-s-lg  hover:bg-[#edba12d0] hover:text-black hover:shadow-md`}
            >
              <IoMdLogOut className="w-6 h-6"/> {!isSidebarCollapsed && (
                  <span className="text-sm font-medium">Logout</span>
                )}
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideLayout;
