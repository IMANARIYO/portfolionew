import AddProjectModal from "./AddProjectModal";
import EditProjectModal from "./EditProjectModal";
import React, { useEffect, useState } from "react";
import ViewProjectModal from "./ViewProjectModal";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import { createProject, deleteProjectById, getAllProjects, getProjectById, updateProjectById } from "../../../apirequest/projectApi";

export default function ProjectTable() {
  const [projectData, setProjectData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newProject, setNewProject] = useState({
    projectName: '',
    languageUsed: '',
    description: '',
    projectLink: '',
    image: '',
    github: '',
  });

  const [editProject, setEditProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [projectToView, setProjectToView] = useState(null);

  // Fetch all projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getAllProjects();
        setProjectData(response.data);
      } catch (error) {
        toast.error("Failed to fetch projects.");
      }
    };

    fetchProjects();
  }, []);

  // CRUD Operations
  const handleDelete = async (id) => {
    try {
      await deleteProjectById(id);
      const updatedProjects = projectData.filter((project) => project._id !== id);
      setProjectData(updatedProjects);
      toast.success("Project deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete project.");
    }
  };

  const handleEdit = async (project) => {
    const response = await getProjectById(project._id);
    setEditProject(response.data);
    setIsEditModalOpen(true);
  };

  const handleViewDetails = async (project) => {
    const response = await getProjectById(project._id);
    setProjectToView(response.data);
    setIsViewModalOpen(true);
  };

  const handleAddProject = async () => {
    if (!newProject.projectName || !newProject.languageUsed || !newProject.description || !newProject.image) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      const createdProject = await createProject(newProject);
      setProjectData([...projectData, createdProject]);
      toast.success("Project added successfully!");
      resetNewProject();
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to add project.");
    }
  };

  const handleUpdateProject = async () => {
    if (!editProject.projectName || !editProject.languageUsed || !editProject.description || !editProject.image) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      const updatedProject = await updateProjectById(editProject._id, editProject);
      const updatedProjects = projectData.map((project) =>
        project._id === updatedProject._id ? updatedProject : project
      );
      setProjectData(updatedProjects);
      toast.success("Project updated successfully!");
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error("Failed to update project.");
    }
  };

  const handleOpenDeleteConfirmation = (id) => {
    setProjectToDelete(id);
    setDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    handleDelete(projectToDelete);
    setDeleteConfirmationOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
  };

  const resetNewProject = () => {
    setNewProject({
      projectName: '',
      languageUsed: '',
      description: '',
      projectLink: '',
      image: '',
      github: '',
    });
  };

  // Handle search filtering
  const filteredProjects = projectData.filter((project) => {
    const searchText = searchTerm.toLowerCase();
    return (
      project.projectName.toLowerCase().includes(searchText) ||
      project.languageUsed.join(", ").toLowerCase().includes(searchText) ||
      project.description.toLowerCase().includes(searchText)
    );
  });

  // Define the DataGrid columns
  const columns = [
    { field: 'projectName', headerName: 'Project Name', width: 200 },
    { field: 'languageUsed', headerName: 'Technologies Used', width: 300 },
    { field: 'company', headerName: 'company', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 400,
      renderCell: (params) => (
        <>
          <button
            onClick={() => handleViewDetails(params.row)}
            className="px-3 py-1 text-white bg-blue-500 rounded-md mr-2"
          >
            View
          </button>
          <button
            onClick={() => handleEdit(params.row)}
            className="px-3 py-1 text-white bg-yellow-500 rounded-md mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => handleOpenDeleteConfirmation(params.row._id)}
            className="px-3 py-1 text-white bg-red-500 rounded-md"
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="p-8 min-h-screen">
        {/* Add New Project Button */}
        <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 px-6 py-2 text-white bg-green-500 rounded-md"
      >
        Add New Project
      </button>
      <ToastContainer />
      <h1 className="text-3xl font-semibold text-center mb-6">Project Management Dashboard</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search projects by title or tech used..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-6 p-2 border border-gray-300 rounded-md"
      />

      {/* DataGrid for displaying projects */}
      <div className="bg-white p-4 shadow-lg rounded-lg">
        <DataGrid
          rows={filteredProjects}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          autoHeight
          getRowId={(row) => row._id}  // Use the unique MongoDB _id as row id
          
        />
      </div>

    

      {/* Modals */}
      <AddProjectModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddProject}
        newProject={newProject}
        setNewProject={setNewProject}
      />
      <EditProjectModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        project={editProject}
        onUpdate={handleUpdateProject}
        setEditProject={setEditProject}
      />
      <ViewProjectModal
        open={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        project={projectToView}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirmationOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg mb-4">Are you sure you want to delete this project?</h2>
            <div className="flex justify-between">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-300 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
