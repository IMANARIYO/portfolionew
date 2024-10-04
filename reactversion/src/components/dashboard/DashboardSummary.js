import "chart.js/auto";
import React, { useEffect, useState } from "react";
import UserService from "../../apirequest/UserServiceApi";
import api from "../../apirequest/api";
import { DataGrid } from "@mui/x-data-grid";
import { Bar, Line, Pie } from "react-chartjs-2";
import { FaAddressBook, FaBlog, FaLightbulb, FaProjectDiagram, FaQuoteLeft, FaServicestack, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// A reusable Card component for each dashboard item
const DashboardCard = ({ title, count, icon: Icon, onClick, gradient }) => (
  <div
    onClick={onClick}
    className={`dashboard-card ${gradient} text-white rounded-lg shadow-md transition-all duration-200 hover:shadow-lg cursor-pointer p-4`}
  >
    <div className="flex flex-col justify-between">
      <h2 className="text-xl sm:text-2xl font-bold mb-2">{title}</h2>
      <p className="text-4xl sm:text-5xl font-extrabold">{count}</p>
    </div>
    <Icon className="text-5xl sm:text-6xl opacity-75" />
  </div>
);

const DashboardSummary = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  // Fetch real user data from an API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await UserService.getAllUsers();
        const result = await response.data;

 
          setUsers(result);
          console.log("User data:", result) // Extract user data from the response
     
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []);

  // Sample data (consider replacing with fetched data)
  const data = {
    contacts: 25,
    users: users.length, // Update this to reflect actual users count
    projects: 12,
    blogs: 8,
    services: 5,
    education: 3,
    skills: 10,
    testimonials: 15,
  };

  // Line chart data for monthly overview
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Projects Over Time',
        data: [2, 3, 1, 5, 4, 6, 7],
        fill: false,
        borderColor: '#4CAF50',
        tension: 0.1,
      },
      {
        label: 'Blogs Over Time',
        data: [1, 1, 2, 2, 3, 4, 5],
        fill: false,
        borderColor: '#FF6347',
        tension: 0.1,
      }
    ]
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

  // Columns for DataGrid
  const columns = [
    // { field: '_id', headerName: 'ID', width: 250 },
    { field: 'fullNames', headerName: 'User', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Role', width: 120 },
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <DashboardCard
          title="Contacts"
          count={data.contacts}
          icon={FaAddressBook}
          onClick={() => handleCardClick("/dashboard/contacts")}
          gradient="bg-gradient-to-r from-purple-500 to-indigo-600"
        />
        <DashboardCard
          title="Users"
          count={data.users}
          icon={FaUsers}
          onClick={() => handleCardClick("/dashboard/UsersManagement")}
          gradient="bg-gradient-to-r from-green-500 to-teal-600"
        />
        <DashboardCard
          title="Projects"
          count={data.projects}
          icon={FaProjectDiagram}
          onClick={() => handleCardClick("/dashboard/projects")}
          gradient="bg-gradient-to-r from-orange-500 to-yellow-600"
        />
        <DashboardCard
          title="Blogs"
          count={data.blogs}
          icon={FaBlog}
          onClick={() => handleCardClick("/dashboard/blogs")}
          gradient="bg-gradient-to-r from-pink-500 to-red-500"
        />
        <DashboardCard
          title="Services"
          count={data.services}
          icon={FaServicestack}
          onClick={() => handleCardClick("/dashboard/services")}
          gradient="bg-gradient-to-r from-indigo-500 to-blue-600"
        />
        <DashboardCard
          title="Skills"
          count={data.skills}
          icon={FaLightbulb}
          onClick={() => handleCardClick("/dashboard/skills")}
          gradient="bg-gradient-to-r from-teal-500 to-green-500"
        />
        <DashboardCard
          title="Testimonials"
          count={data.testimonials}
          icon={FaQuoteLeft}
          onClick={() => handleCardClick("/dashboard/testimonials")}
          gradient="bg-gradient-to-r from-cyan-500 to-teal-500"
        />
      </div>

      {/* Charts Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Bar Chart */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-2">Data Overview</h3>
          <Bar data={barData} options={{ responsive: true }} height={200} />
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-2">Skills & Education</h3>
          <Pie data={pieData} options={{ responsive: true }} height={200} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="bg-white shadow-lg rounded-lg p-4 w-full md:w-1/2">
          <h3 className="text-xl font-semibold mb-2">Monthly Projects & Blogs Overview</h3>
          <Line data={lineData} options={{ responsive: true }} height={200} />
        </div>

        {/* Data Grid for User Information */}
        <div className="bg-white shadow-lg rounded-lg w-full md:w-1/2 p-4">
          <h3 className="text-xl font-semibold mb-4">User Information</h3>
          <DataGrid
            columns={columns}
            rows={users}
            getRowId={(row) => row._id}
            autoHeight // Adjust height automatically based on content
            pageSize={5} // Number of rows to display per page
            rowsPerPageOptions={[5, 10, 20]} // Options for page sizes
            className="min-h-[200px]"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
