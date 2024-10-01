import React, { useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

import {
  FaAddressBook,
  FaBlog,
  FaGraduationCap,
  FaProjectDiagram,
  FaQuoteLeft,
  FaRegLightbulb,
  FaServicestack,
  FaUser,
  FaUserTie,
} from "react-icons/fa";

// Array containing sidebar items
const sidebarItems = [
  {
    id: "projects",
    label: "Projects",
    icon: <FaProjectDiagram className="h-5 w-5" />,
    path: "/dashboard/projects",
  },
  {
    id: "services",
    label: "Services",
    icon: <FaServicestack className="h-5 w-5" />,
    path: "/dashboard/services",
  },
  {
    id: "skills",
    label: "Skills",
    icon: <FaRegLightbulb className="h-5 w-5" />,
    path: "/dashboard/skills",
  },
  {
    id: "education",
    label: "Education",
    icon: <FaGraduationCap className="h-5 w-5" />,
    path: "/dashboard/education",
  },
  {
    id: "experience",
    label: "Experience",
    icon: <FaUserTie className="h-5 w-5" />,
    path: "/dashboard/experience",
  },
  {
    id: "users",
    label: "users",
    icon: <FaUserTie className="h-5 w-5" />,
    path: "/dashboard/UsersManagement",
  },
  {
    id: "testimonials",
    label: "Testimonials",
    icon: <FaQuoteLeft className="h-5 w-5" />,
    path: "/dashboard/testimonials",
  },
  {
    id: "blog",
    label: "Blog",
    icon: <FaBlog className="h-5 w-5" />,
    path: "/dashboard/blogPostsManagement",
  },
  {
    id: "contacts",
    label: "Contacts",
    icon: <FaAddressBook className="h-5 w-5" />,
    path: "/dashboard/contacts",
  },
  {
    id: "profile-management",
    label: "Profile Management",
    icon: <FaUser className="h-5 w-5" />,
    path: "/dashboard/profile-management",
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Toggle state

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={` bg-slate-950 flex flex-col text-white h-full transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
         <button onClick={toggleSidebar} className="p-2">
          {isOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      <div className="flex items-center justify-between p-4 border-b ">
        <h2
          className={`text-xl font-bold transition-all duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          Dashboard
        </h2>
     
      </div>

      <ul className="flex flex-col mt-4">
        {sidebarItems.map((item) => (
          <li
            key={item.id}
            className="flex items-center p-2 hover:bg-gray-700 transition duration-200 rounded-md"
          >
            <Link to={item.path} className="flex items-center">
              {item.icon}
              <span
                className={`ml-2 transition-all duration-300 ${
                  isOpen ? "opacity-100" : "opacity-0"
                }`}
              >
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
