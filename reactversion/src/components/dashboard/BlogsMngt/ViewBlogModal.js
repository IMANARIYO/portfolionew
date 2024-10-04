import Modal from "@mui/material/Modal";
import React from "react";

export default function ViewBlogModal({ open, onClose, blogData }) {
  if (!blogData) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto mt-20">
        <h2 className="text-2xl font-bold mb-4">{blogData.title}</h2>
        <p><strong>Category:</strong> {blogData.category}</p>
        <p><strong>Author:</strong> {blogData.author}</p>
        <p><strong>Description:</strong></p>
        <div dangerouslySetInnerHTML={{ __html: blogData.description }} />
        <img src={blogData.image} alt={blogData.title} className="w-full mt-4" />
      </div>
    </Modal>
  );
}
