import Modal from "@mui/material/Modal";
import React from "react";
import { useForm } from "react-hook-form";
import { createProject } from "../../../apirequest/projectApi";

const AddProjectModal = ({ open, onClose }) => {
  // Setup React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to handle adding a new project
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("projectName", data.title);
    const imageToSend = data.image.length > 0 ? data.image[0] : data.imageUrl;
    formData.append("image", imageToSend); // Use uploaded file or pasted URL
    formData.append("github", data.githubLink);
    formData.append("languageUsed", data.techUsed.split(",")); // Split string into an array
    formData.append("projectLink", data.visitLink);
    formData.append("startDate", data.startDate);
    formData.append("description", data.description);
    formData.append("company", data.company); // Add company to formData

    try {
      const response = await createProject(formData);
      console.log("response status", response.status);
      onClose(); 
      if (response.status === 201) {
        onClose(); // Close the modal after successful submission
      }
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Failed to add project. Please try again."); // Show error message
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className="fixed top-30 left-0 right-0 bottom-0 flex items-center justify-center z-50"
    >
      <div className="modal-container bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg mx-auto mt-21 overflow-auto h-[90vh]">
        <div className="modal-header flex justify-between items-center mb-4">
          <h2 className="modal-title text-2xl font-semibold text-black">Add New Project</h2>
          <button onClick={onClose} className="modal-close text-black text-lg font-bold">X</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="modal-form">
          {/* Project Title */}
          <div className="form-group mb-4">
            <label className="form-label text-sm font-medium text-gray-700">Project Title:</label>
            <input
              type="text"
              placeholder="Project Title"
              className="form-input p-3 border rounded-lg w-full text-gray-700"
              {...register("title", { required: "Project title is required" })}
            />
            {errors.title && <span className="form-error text-red-500">{errors.title.message}</span>}
          </div>

          {/* Company */}
          <div className="form-group mb-4">
            <label className="form-label block text-sm font-medium text-gray-700">Company:</label>
            <input
              type="text"
              placeholder="Company"
              className="form-input p-3 border rounded-lg w-full text-gray-700"
              {...register("company")}
            />
          </div>

          {/* Technologies Used */}
          <div className="form-group mb-4">
            <label className="form-label block text-sm font-medium text-gray-700">Technologies Used:</label>
            <input
              type="text"
              placeholder="Technologies Used (comma separated)"
              className="form-input p-3 border rounded-lg w-full text-gray-700"
              {...register("techUsed", { required: "Technologies used are required" })}
            />
            {errors.techUsed && <span className="form-error text-red-500">{errors.techUsed.message}</span>}
          </div>

          {/* Description */}
          <div className="form-group mb-4">
            <label className="form-label block text-sm font-medium text-gray-700">Description:</label>
            <textarea
              placeholder="Description"
              className="form-input p-3 border rounded-lg w-full text-gray-700"
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && <span className="form-error text-red-500">{errors.description.message}</span>}
          </div>

          {/* Image Upload or URL */}
          <div className="form-group mb-4">
            <label className="form-label block text-sm font-medium text-gray-700">Upload Image:</label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="form-file-input mb-2"
            />
            <label className="form-label block text-sm font-medium text-gray-700">Or Paste Image URL:</label>
            <input
              type="text"
              placeholder="Paste Image URL"
              className="form-input p-3 border rounded-lg w-full text-gray-700"
              {...register("imageUrl")}
            />
          </div>

          {/* GitHub Link */}
          <div className="form-group mb-4">
            <label className="form-label block text-sm font-medium text-gray-700">GitHub Link:</label>
            <input
              type="text"
              placeholder="GitHub Link"
              className="form-input p-3 border rounded-lg w-full text-gray-700"
              {...register("githubLink")}
            />
          </div>

          {/* Visit Link */}
          <div className="form-group mb-4">
            <label className="form-label block text-sm font-medium text-gray-700">Visit Link:</label>
            <input
              type="text"
              placeholder="Visit Link"
              className="form-input p-3 border rounded-lg w-full text-gray-700"
              {...register("visitLink")}
            />
          </div>

          {/* Start Date */}
          <div className="form-group mb-4">
            <label className="form-label block text-sm font-medium text-gray-700">Start Date:</label>
            <input
              type="date"
              className="form-input p-3 border rounded-lg w-full text-gray-700"
              {...register("startDate", { required: "Start date is required" })}
            />
            {errors.startDate && <span className="form-error text-red-500">{errors.startDate.message}</span>}
          </div>

          {/* Action Buttons */}
          <div className="modal-footer flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={onClose}
              className="cancel-button bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddProjectModal;
