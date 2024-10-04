import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import Modal from "@mui/material/Modal";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import sanitizeHtml from "sanitize-html";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function EditBlogModal({ open, onClose, blogData, onUpdateBlog }) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const [description, setDescription] = useState(""); // Holds the blog description
  const [image, setImage] = useState(null); // Holds the uploaded image file

  // Effect to set initial values when the modal opens
  useEffect(() => {
    if (blogData) {
      setValue("title", blogData.title);
      setValue("category", blogData.category);
      setValue("author", blogData.author);
      setDescription(blogData.description);
    }
  }, [blogData, setValue]);

 
  // Submit the form
  const onSubmit = async (data) => {
    const sanitizedDescription = sanitizeHtml(description); // Sanitize the description


    const imageToSend = data.image.length > 0 ? data.image[0] : blogData.imageUrl;
    // Create form data to send to the server
    const formData = new FormData();
    formData.append("_id", blogData._id); // Include the blog ID
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("description", sanitizedDescription);
    formData.append("image", imageToSend); // Append the image file

    await onUpdateBlog(formData); // Call the function to update the blog
    reset(); // Reset form fields
    setDescription(""); // Clear description
    setImage(null); // Clear image
    onClose(); // Close modal
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto mt-20 overflow-auto h-[70vh]">
        <h2 className="text-2xl font-bold mb-4">Edit Blog Post</h2>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
          &times; {/* Close icon */}
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title Input */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">Title</label>
            <input
              id="title"
              type="text"
              {...register("title", { required: true })}
              className="w-full p-2 border border-gray-300 rounded text-gray-700"
            />
            {errors.title && <span className="text-red-500">Title is required</span>}
          </div>

          {/* Category Input */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700">Category</label>
            <input
              id="category"
              type="text"
              {...register("category", { required: true })}
              className="w-full p-2 border border-gray-300 rounded text-gray-700"
            />
            {errors.category && <span className="text-red-500">Category is required</span>}
          </div>

          {/* Author Input */}
          <div className="mb-4">
            <label htmlFor="author" className="block text-gray-700">Author</label>
            <input
              id="author"
              type="text"
              {...register("author", { required: true })}
              className="w-full p-2 border border-gray-300 rounded text-gray-700"
            />
            {errors.author && <span className="text-red-500">Author is required</span>}
          </div>

          {/* Description Input */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">Description</label>
            <ReactQuill value={description} onChange={setDescription} theme="snow"  className=" text-gray-700"/>
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700">Upload Image</label>
            <input
              id="image"
              type="file"
              accept="image/*"
             
              {...register("image", { required: true })} // Use register for file input
              className="w-full p-2 border border-gray-300 rounded text-gray-700"
            />
            {errors.image && <span className="text-red-500">Image is required</span>}
          </div>

          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Update Blog
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
