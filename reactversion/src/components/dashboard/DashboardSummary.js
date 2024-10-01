import "chart.js/auto";
import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

import {
  FaAddressBook, FaBlog, FaGraduationCap, FaLightbulb, FaProjectDiagram,
  FaQuoteLeft, FaServicestack, FaUsers
} from "react-icons/fa";

const DashboardSummary = () => {
  const navigate = useNavigate();

  // Sample data (replace with actual data fetching logic)
  const data = {
    contacts: 25,
    users: 100,
    projects: 12,
    blogs: 8,
    services: 5,
    education: 3,
    skills: 10,
    testimonials: 15,
    skillCategories: 4,
  };

  // Bar chart data
  const barData = {
    labels: ['Contacts', 'Users', 'Projects', 'Blogs', 'Services'],
    datasets: [{
      label: 'Data Overview',
      data: [data.contacts, data.users, data.projects, data.blogs, data.services],
      backgroundColor: ['#6A5ACD', '#4CAF50', '#FFA500', '#FF4500', '#4682B4'],
      borderColor: '#ffffff',
      borderWidth: 2,
    }]
  };

  // Pie chart data
  const pieData = {
    labels: ['Skills', 'Education', 'Testimonials'],
    datasets: [{
      data: [data.skills, data.education, data.testimonials],
      backgroundColor: ['#FFD700', '#FF8C00', '#FF6347'],
      borderColor: '#fff',
      hoverBorderColor: '#000',
    }]
  };

  // Handle navigation when cards are clicked
  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* Contacts Card */}
        <div
          onClick={() => handleCardClick("/dashboard/contacts")}
          className="dashboard-card bg-gradient-to-r from-purple-500 to-indigo-600 text-white"
        >
          <div className="flex flex-col justify-between">
            <h2 className="text-2xl font-bold mb-2">Contacts</h2>
            <p className="text-5xl font-extrabold">{data.contacts}</p>
          </div>
          <FaAddressBook className="text-6xl opacity-75" />
        </div>

        {/* Users Card */}
        <div
          onClick={() => handleCardClick("/dashboard/users")}
          className="dashboard-card bg-gradient-to-r from-green-500 to-teal-600 text-white"
        >
          <div className="flex flex-col justify-between">
            <h2 className="text-2xl font-bold mb-2">Users</h2>
            <p className="text-5xl font-extrabold">{data.users}</p>
          </div>
          <FaUsers className="text-6xl opacity-75" />
        </div>

        {/* Projects Card */}
        <div
          onClick={() => handleCardClick("/dashboard/projects")}
          className="dashboard-card bg-gradient-to-r from-orange-500 to-yellow-600 text-white"
        >
          <div className="flex flex-col justify-between">
            <h2 className="text-2xl font-bold mb-2">Projects</h2>
            <p className="text-5xl font-extrabold">{data.projects}</p>
          </div>
          <FaProjectDiagram className="text-6xl opacity-75" />
        </div>

        {/* Blogs Card */}
        <div
          onClick={() => handleCardClick("/dashboard/blogs")}
          className="dashboard-card bg-gradient-to-r from-pink-500 to-red-500 text-white"
        >
          <div className="flex flex-col justify-between">
            <h2 className="text-2xl font-bold mb-2">Blogs</h2>
            <p className="text-5xl font-extrabold">{data.blogs}</p>
          </div>
          <FaBlog className="text-6xl opacity-75" />
        </div>

        {/* Services Card */}
        <div
          onClick={() => handleCardClick("/dashboard/services")}
          className="dashboard-card bg-gradient-to-r from-indigo-500 to-blue-600 text-white"
        >
          <div className="flex flex-col justify-between">
            <h2 className="text-2xl font-bold mb-2">Services</h2>
            <p className="text-5xl font-extrabold">{data.services}</p>
          </div>
          <FaServicestack className="text-6xl opacity-75" />
        </div>

        {/* Education Card */}
        <div
          onClick={() => handleCardClick("/dashboard/education")}
          className="dashboard-card bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
        >
          <div className="flex flex-col justify-between">
            <h2 className="text-2xl font-bold mb-2">Education</h2>
            <p className="text-5xl font-extrabold">{data.education}</p>
          </div>
          <FaGraduationCap className="text-6xl opacity-75" />
        </div>

        {/* Skills Card */}
        <div
          onClick={() => handleCardClick("/dashboard/skills")}
          className="dashboard-card bg-gradient-to-r from-teal-500 to-green-500 text-white"
        >
          <div className="flex flex-col justify-between">
            <h2 className="text-2xl font-bold mb-2">Skills</h2>
            <p className="text-5xl font-extrabold">{data.skills}</p>
          </div>
          <FaLightbulb className="text-6xl opacity-75" />
        </div>

        {/* Testimonials Card */}
        <div
          onClick={() => handleCardClick("/dashboard/testimonials")}
          className="dashboard-card bg-gradient-to-r from-cyan-500 to-teal-500 text-white"
        >
          <div className="flex flex-col justify-between">
            <h2 className="text-2xl font-bold mb-2">Testimonials</h2>
            <p className="text-5xl font-extrabold">{data.testimonials}</p>
          </div>
          <FaQuoteLeft className="text-6xl opacity-75" />
        </div>
      </div>

      {/* Data Overview - Bar Chart */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Data Overview</h3>
        <div className="relative w-full">
          <Bar data={barData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Skills & Education - Pie Chart */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Skills & Education</h3>
        <div className="relative w-full">
          <Pie data={pieData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Example Table */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">User Information</h3>
        <table className="min-w-full bg-white border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border">User</th>
              <th className="py-3 px-4 border">Email</th>
              <th className="py-3 px-4 border">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3 px-4 border">John Doe</td>
              <td className="py-3 px-4 border">john.doe@example.com</td>
              <td className="py-3 px-4 border">Admin</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="py-3 px-4 border">Jane Smith</td>
              <td className="py-3 px-4 border">jane.smith@example.com</td>
              <td className="py-3 px-4 border">User</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardSummary;
