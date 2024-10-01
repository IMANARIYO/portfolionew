import "react-toastify/dist/ReactToastify.css";
import EditBlogModal from "./EditBlogModal ";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";

// Blog posts data
export const blogPosts = [
  {
    id: 1,
    image: 'images/fullstack.png',
    title: 'The Future of Web Development',
    excerpt: 'An in-depth look at emerging trends in web technologies.',
    category: 'Web Development',
    author: 'John Doe',
    date: 'August 29, 2024',
    likes: 120,
    dislikes: 5,
    comments: 15,
  },
  // More blog posts...
];

export default function BlogTable() {
  const [blogData, setBlogData] = useState(blogPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [editBlog, setEditBlog] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Define columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'image',
      headerName: 'Image',
      width: 100,
      renderCell: (params) => (
        <img src={params.value} alt="Blog Post" className="w-12 h-12 rounded" />
      ),
    },
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'author', headerName: 'Author', width: 150 },
    { field: 'date', headerName: 'Date', width: 150 },
    {
      field: 'likes',
      headerName: 'Likes',
      width: 100,
      renderCell: (params) => <span className="text-green-500">{params.value}</span>,
    },
    {
      field: 'dislikes',
      headerName: 'Dislikes',
      width: 100,
      renderCell: (params) => <span className="text-red-500">{params.value}</span>,
    },
    {
      field: 'comments',
      headerName: 'Comments',
      width: 120,
      renderCell: (params) => (
        <span className="text-blue-500">{params.value} comments</span>
      ),
    },
    {
      field: 'action',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <>
          <button
            onClick={() => handleEditClick(params.row)}
            className="text-blue-500 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => handleViewClick(params.row)}
            className="text-green-500 hover:underline ml-4"
          >
            View
          </button>
          <button
            onClick={() => handleDelete(params.row.id)}
            className="text-red-500 hover:underline ml-4"
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  // Handle search filtering
  const filteredBlogPosts = blogData.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (row) => {
    setEditBlog(row);
    setIsEditModalOpen(true);
  };

  const handleViewClick = (row) => {
    alert(JSON.stringify(row, null, 2)); // You can replace this with a proper modal or view component
  };

  const handleDelete = (id) => {
    const updatedData = blogData.filter((post) => post.id !== id);
    setBlogData(updatedData);
    toast.success("Blog post deleted successfully!");
  };

  const handleAddBlog = (newBlog) => {
    setBlogData([...blogData, { id: blogData.length + 1, ...newBlog }]);
    toast.success("Blog post added successfully!");
  };

  const handleUpdateBlog = (updatedBlog) => {
    const updatedData = blogData.map((post) =>
      post.id === updatedBlog.id ? updatedBlog : post
    );
    setBlogData(updatedData);
    toast.success("Blog post updated successfully!");
  };

  return (
    <div className=" bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Blog Management Dashboard</h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search blog posts by title or category..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* DataGrid to display blog posts */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={filteredBlogPosts}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </div>

      <button
        onClick={() => setIsAddModalOpen(true)}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
      >
        Add New Blog Post
      </button>

      {/* Add Blog Modal */}
      <EditBlogModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        blogPost={null}
        setBlogPost={setEditBlog}
        handleAddBlog={handleAddBlog}
      />

      {/* Edit Blog Modal */}
      <EditBlogModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        blogPost={editBlog}
        setBlogPost={setEditBlog}
        handleUpdateBlog={handleUpdateBlog}
      />

      <ToastContainer />
    </div>
  );
}
