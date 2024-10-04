import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import sanitizeHtml from "sanitize-html";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function AddBlogModal({ open, onClose, onAddBlog }) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const onSubmit = async (data) => {
    const sanitizedDescription = sanitizeHtml(description);
    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    // Create form data to send
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("description", sanitizedDescription);
    formData.append("image", image);

    onAddBlog(formData);

    // Reset the form
    reset();
    setDescription("");
    setImage(null);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto mt-20 text-black h-[72vh] overflow-auto">
        <h2 className="text-2xl font-bold mb-4">Add New Blog Post</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title Input */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">
              Title
            </label>
            <input
              id="title"
              type="text"
              {...register("title", { required: true })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.title && <span className="text-red-500">Title is required</span>}
          </div>

          {/* Category Input */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700">
              Category
            </label>
            <input
              id="category"
              type="text"
              {...register("category", { required: true })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.category && <span className="text-red-500">Category is required</span>}
          </div>

          {/* Author Input */}
          <div className="mb-4">
            <label htmlFor="author" className="block text-gray-700">
              Author
            </label>
            <input
              id="author"
              type="text"
              {...register("author", { required: true })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.author && <span className="text-red-500">Author is required</span>}
          </div>

          {/* Description Input */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">
              Description
            </label>
            <ReactQuill value={description} onChange={setDescription} theme="snow" />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700">
              Upload Image
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Blog
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
