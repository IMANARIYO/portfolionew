import "react-toastify/dist/ReactToastify.css";
import AddBlogModal from "./AddBlogModal";
import EditBlogModal from "./EditBlogModal ";
import React, { useEffect, useState } from "react";
import ViewBlogModal from "./ViewBlogModal";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import { createBlog, deleteBlogById, getAllBlogs, updateBlogById } from "../../../apirequest/blogApi";

export default function BlogTable() {
  const [blogData, setBlogData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editBlog, setEditBlog] = useState(null);
  const [viewBlog, setViewBlog] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Fetch all blogs on component load
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getAllBlogs();
        setBlogData(response.data); // Assuming response is an array of blog data
      } catch (error) {
        console.error("Error fetching blogs:", error);
        toast.error("Failed to load blog data.");
      }
    };
    fetchBlogs();
  }, []);

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
        <span className="text-blue-500">{params.value.length} comments</span>
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
            onClick={() => handleDelete(params.row._id)}
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
      post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (row) => {
    setEditBlog(row);
    setIsEditModalOpen(true);
  };

  const handleViewClick = (row) => {
    setViewBlog(row);
    setIsViewModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBlogById(id);
      const updatedData = blogData.filter((post) => post._id !== id);
      setBlogData(updatedData);
      toast.success("Blog post deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog post.");
    }
  };

  const handleAddBlog = async (newBlog) => {
    try {
      const createdBlog = await createBlog(newBlog);
      setBlogData([...blogData, createdBlog]);
      toast.success("Blog post added successfully!");
    } catch (error) {
      console.error("Error adding blog:", error);
      toast.error("Failed to add blog post.");
    }
  };

  const handleUpdateBlog = async (updatedBlog) => {
    try {
      await updateBlogById(updatedBlog.get('_id'), updatedBlog);
      const updatedData = blogData.map((post) =>
        post._id === updatedBlog.get('_id') ? { ...post, ...updatedBlog } : post
      );
      setBlogData(updatedData);
      toast.success("Blog post updated successfully!");
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog post.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
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
            getRowId={(row) => row?._id}
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
      <AddBlogModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddBlog={handleAddBlog}
      />

      {/* Edit Blog Modal */}
      <EditBlogModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        blogData={editBlog}
        onUpdateBlog={handleUpdateBlog}
      />

      {/* View Blog Modal */}
      <ViewBlogModal
        open={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        blogData={viewBlog}
      />

      <ToastContainer />
    </div>
  );
}
