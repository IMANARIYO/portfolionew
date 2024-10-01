import Modal from "@mui/material/Modal";
import React, { useEffect } from "react";

const EditBlogModal = ({ isOpen, onClose, blogPost, setBlogPost, handleUpdateBlog, handleAddBlog }) => {
  const [formData, setFormData] = React.useState({
    image: '',
    title: '',
    excerpt: '',
    category: '',
    author: '',
    date: '',
    likes: 0,
    dislikes: 0,
    comments: 0,
  });

  useEffect(() => {
    if (blogPost) {
      setFormData(blogPost);
    } else {
      setFormData({
        image: '',
        title: '',
        excerpt: '',
        category: '',
        author: '',
        date: '',
        likes: 0,
        dislikes: 0,
        comments: 0,
      });
    }
  }, [blogPost]);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };
  
  const handleSubmit = () => {
    if (blogPost) {
      handleUpdateBlog(formData);
    } else {
      handleAddBlog(formData);
    }
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="bg-bodyColor p-6 rounded-lg shadow-lg w-1/2 overflow-y-auto mx-auto h-70%">
        <h2 className="text-2xl font-semibold mb-4 text-white">{blogPost ? "Edit" : "Add"} Blog Post</h2>
        <div className="mb-4">
  <label className="block text-sm font-medium mb-2 text-gray-300">Image:</label>
  <input
    type="file"
    accept="image/*"
    className="p-3 border border-gray-300 rounded-lg shadow-sm mb-2 w-full bg-gray-700 text-white"
    onChange={handleImageUpload}
  />
  {formData.image && (
    <img src={formData.image} alt="Image Preview" className="w-32 h-32 object-cover mt-2" />
  )}
  <input
    type="text"
    placeholder="Image URL (optional)"
    className="p-3 border border-gray-300 rounded-lg shadow-sm mb-2 w-full bg-gray-700 text-white"
    value={formData.image}
    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
  />
</div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-300">Title:</label>
          <input
            type="text"
            placeholder="Title"
            className="p-3 border border-gray-300 rounded-lg shadow-sm mb-2 w-full bg-gray-700 text-white"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-300">Excerpt:</label>
          <input
            type="text"
            placeholder="Excerpt"
            className="p-3 border border-gray-300 rounded-lg shadow-sm mb-2 w-full bg-gray-700 text-white"
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-300">Category:</label>
          <input
            type="text"
            placeholder="Category"
            className="p-3 border border-gray-300 rounded-lg shadow-sm mb-2 w-full bg-gray-700 text-white"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-300">Author:</label>
          <input
            type="text"
            placeholder="Author"
            className="p-3 border border-gray-300 rounded-lg shadow-sm mb-2 w-full bg-gray-700 text-white"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-300">Date:</label>
          <input
            type="text"
            placeholder="Date"
            className="p-3 border border-gray-300 rounded-lg shadow-sm mb-2 w-full bg-gray-700 text-white"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
        >
          {blogPost ? "Update" : "Add"} Blog Post
        </button>
      </div>
    </Modal>
  );
};

export default EditBlogModal;
