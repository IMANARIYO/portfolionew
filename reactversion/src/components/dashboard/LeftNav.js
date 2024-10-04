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
  FaHome,
  FaChartPie,
} from "react-icons/fa";

// Array containing sidebar items with new unique icons
const sidebarItems = [
  {
    id: "home",
    label: "Home",
    icon: <FaHome className="h-6 w-6 icon" />,
    path: "/dashboard",
  },
  {
    id: "projects",
    label: "Projects",
    icon: <FaProjectDiagram className="h-6 w-6 icon" />,
    path: "/dashboard/projects",
  },
  {
    id: "services",
    label: "Services",
    icon: <FaServicestack className="h-6 w-6 icon" />,
    path: "/dashboard/services",
  },
  {
    id: "skills",
    label: "Skills",
    icon: <FaRegLightbulb className="h-6 w-6 icon" />,
    path: "/dashboard/skills",
  },
  {
    id: "education",
    label: "Education",
    icon: <FaGraduationCap className="h-6 w-6 icon" />,
    path: "/dashboard/education",
  },
  {
    id: "experience",
    label: "Experience",
    icon: <FaUserTie className="h-6 w-6 icon" />,
    path: "/dashboard/experience",
  },
  {
    id: "users",
    label: "Users",
    icon: <FaUser className="h-6 w-6 icon" />,
    path: "/dashboard/UsersManagement",
  },
  {
    id: "testimonials",
    label: "Testimonials",
    icon: <FaQuoteLeft className="h-6 w-6 icon" />,
    path: "/dashboard/testimonials",
  },
  {
    id: "blog",
    label: "Blog",
    icon: <FaBlog className="h-6 w-6 icon" />,
    path: "/dashboard/blogPostsManagement",
  },
  {
    id: "contacts",
    label: "Contacts",
    icon: <FaAddressBook className="h-6 w-6 icon" />,
    path: "/dashboard/contacts",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <FaChartPie className="h-6 w-6 icon" />,
    path: "/dashboard",
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Toggle state

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`bg-gray-500 flex flex-col text-white h-[100vh] transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      } sidebar-container`}
    >
      <button onClick={toggleSidebar} className="p-2 sidebar-toggle">
        {isOpen ? (
          <XIcon className="h-6 w-6 toggle-icon" />
        ) : (
          <MenuIcon className="h-6 w-6 toggle-icon" />
        )}
      </button>
      <div className="flex items-center justify-between p-4 border-b sidebar-header">
        <h2
          className={`text-xl font-bold transition-all duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          } sidebar-title`}
        >
          Dashboard
        </h2>
      </div>

      <ul className="flex flex-col mt-4 sidebar-list">
        {sidebarItems.map((item) => (
          <li
            key={item.id}
            className={`flex items-center p-2 hover:bg-gray-800 transition duration-200 rounded-md sidebar-item ${
              isOpen ? "sidebar-item-open" : "sidebar-item-closed"
            }`}
          >
            <Link to={item.path} className="flex items-center sidebar-link">
              {item.icon}
              <span
                className={`ml-2 transition-all duration-300 ${
                  isOpen ? "opacity-100" : "opacity-0"
                } sidebar-label`}
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
