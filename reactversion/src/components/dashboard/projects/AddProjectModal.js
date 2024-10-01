import Modal from "@mui/material/Modal";
import React from "react";
import api from "../../../apirequest/api";
import axios from "axios";
import { useForm } from "react-hook-form";
import { createProject } from "../../../apirequest/projectApi";

const AddProjectModal = ({ open, onClose,  }) => {
  // Setup React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Function to handle adding a new project
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("projectName", data.title);
    // Handle the image input based on user selection
    const imageToSend = data.image.length > 0 ? data.image[0] : data.imageUrl;
    formData.append("image", imageToSend); // Use uploaded file or pasted URL
    formData.append("github", data.githubLink);
    formData.append("languageUsed", data.techUsed.split(",")); // Split string into an array
    formData.append("projectLink", data.visitLink);
    formData.append("startDate", data.startDate);
    formData.append("description", data.description);

    try {
      const response = await createProject(formData);
      console.log("response status",response.status);

      if (response.status === 201) {
      
        onClose(); // Close the modal after successful submission
      }
    } catch (error) {
      console.error("Error adding project:", error);
      alert('Failed to add project. Please try again.'); // Show error message
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className="fixed z-10 inset-0 overflow-y-auto text-bodyColor h-100%"
    >
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/2 mx-auto mt-20">
        <h2 className="text-2xl font-semibold mb-4 text-white">Add New Project</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Project Title */}
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

          {/* Company */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-300">Company:</label>
            <input
              type="text"
              placeholder="Company"
              className={`p-3 border rounded-lg shadow-sm mb-2 w-full ${errors.company ? 'border-red-500' : 'border-gray-300'} bg-gray-700 text-white`}
              {...register("company")}
            />
          </div>

          {/* Technologies Used */}
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

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-300">Description:</label>
            <textarea
              placeholder="Description"
              className={`p-3 border rounded-lg shadow-sm mb-2 w-full ${errors.description ? 'border-red-500' : 'border-gray-300'} bg-gray-700 text-white`}
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && <span className="text-red-500">{errors.description.message}</span>}
          </div>

          {/* Upload Image or URL */}
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

          {/* GitHub Link */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-300">GitHub Link:</label>
            <input
              type="text"
              placeholder="GitHub Link"
              className={`p-3 border rounded-lg shadow-sm mb-2 w-full ${errors.githubLink ? 'border-red-500' : 'border-gray-300'} bg-gray-700 text-white`}
              {...register("githubLink")}
            />
          </div>

          {/* Visit Link */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-300">Visit Link:</label>
            <input
              type="text"
              placeholder="Visit Link"
              className={`p-3 border rounded-lg shadow-sm mb-2 w-full ${errors.visitLink ? 'border-red-500' : 'border-gray-300'} bg-gray-700 text-white`}
              {...register("visitLink")}
            />
          </div>

          {/* Start Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-300">Start Date:</label>
            <input
              type="date"
              className={`p-3 border rounded-lg shadow-sm mb-2 w-full ${errors.startDate ? 'border-red-500' : 'border-gray-300'} bg-gray-700 text-white`}
              {...register("startDate", { required: "Start date is required" })}
            />
            {errors.startDate && <span className="text-red-500">{errors.startDate.message}</span>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
          >
            Add Project
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddProjectModal;
