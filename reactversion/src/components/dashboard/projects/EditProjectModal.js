import Modal from "@mui/material/Modal";
import React from "react";
import api from "../../../apirequest/api";
import axios from "axios";
import { useForm } from "react-hook-form";

const ProjectModal = ({ open, onClose, project}) => {
  // Setup React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: project, // Initialize form with project data
  });

  // Function to handle updating the project
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("projectName", data.title);
    // Handle the image input based on user selection
    const imageToSend = data.image.length > 0 ? data.image[0] : data.imageUrl;
    formData.append("image", imageToSend); // Use uploaded file or pasted URL
    formData.append("github", data.githubLink);
    formData.append("languageUsed", data.techUsed.split(",")); // Split string into an array
    formData.append("projectLink", data.visitLink);
    formData.append("description", data.description);
formData.append("company", data.company);
    try {
      const response = await api.put(`/projects/${project._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('Project updated successfully!'); // Show success message
        onClose(); // Close the modal after successful submission
      }
    } catch (error) {
      console.error("Error updating project:", error);
      alert('Failed to update project. Please try again.'); // Show error message
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className="overflow-y-auto"
    >
      <div className="bg-bodyColor p-6 rounded-lg shadow-lg w-1/2 mx-auto mt-20">
        <h2 className="text-2xl font-semibold mb-4 text-white">Edit Project</h2>
        
        {project && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-300">Project Title:</label>
              <input
                type="text"
                placeholder="Project Title"
                className={`p-3 border rounded-lg shadow-sm mb-2 w-full ${errors.title ? 'border-red-500' : 'border-gray-300'} bg-gray-700 text-white`}
                {...register("title", { required: "Project title is required" })}
              />
              {errors.title && <span className="text-red-500">{errors.title.message}</span>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-300">Company:</label>
              <input
                type="text"
                placeholder="Company"
                className={`p-3 border rounded-lg shadow-sm mb-2 w-full ${errors.company ? 'border-red-500' : 'border-gray-300'} bg-gray-700 text-white`}
                {...register("company")}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-300">Technologies Used:</label>
              <input
                type="text"
                placeholder="Technologies Used (comma separated)"
                className={`p-3 border rounded-lg shadow-sm mb-2 w-full ${errors.techUsed ? 'border-red-500' : 'border-gray-300'} bg-gray-700 text-white`}
                {...register("techUsed", { required: "Technologies used are required" })}
              />
              {errors.techUsed && <span className="text-red-500">{errors.techUsed.message}</span>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-300">Description:</label>
              <textarea
                placeholder="Description"
                className={`p-3 border rounded-lg shadow-sm mb-2 w-full ${errors.description ? 'border-red-500' : 'border-gray-300'} bg-gray-700 text-white`}
                {...register("description", { required: "Description is required" })}
              />
              {errors.description && <span className="text-red-500">{errors.description.message}</span>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-300">Upload Image:</label>
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                className={`mb-2 ${errors.image ? 'border-red-500' : ''} bg-gray-700 text-white`}
              />
              {/* Input for image URL */}
              <label className="block text-sm font-medium mb-2 text-gray-300">Or Paste Image URL:</label>
              <input
                type="text"
                placeholder="Paste Image URL"
                className={`p-3 border rounded-lg shadow-sm mb-2 w-full ${errors.imageUrl ? 'border-red-500' : 'border-gray-300'} bg-gray-700 text-white`}
                {...register("imageUrl")}
              />
              {errors.imageUrl && <span className="text-red-500">{errors.imageUrl.message}</span>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-300">GitHub Link:</label>
              <input
                type="text"
                placeholder="GitHub Link"
                className={`p-3 border rounded-lg shadow-sm mb-2 w-full ${errors.githubLink ? 'border-red-500' : 'border-gray-300'} bg-gray-700 text-white`}
                {...register("githubLink")}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-300">Visit Link:</label>
              <input
                type="text"
                placeholder="Visit Link"
                className={`p-3 border rounded-lg shadow-sm mb-2 w-full ${errors.visitLink ? 'border-red-500' : 'border-gray-300'} bg-gray-700 text-white`}
                {...register("visitLink")}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
            >
              Update Project
            </button>
          </form>
        )}
      </div>
    </Modal>
  );
};

export default ProjectModal;
