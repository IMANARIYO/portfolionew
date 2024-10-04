import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

import {
  createTestimony,
  getAllTestimonies,
  updateTestimonyById,
  deleteTestimonyById,
} from "../../../apirequest/testimonyApi";

const TestimonialsMngt = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewTestimonial, setViewTestimonial] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { register, handleSubmit, reset,  formState: { errors } } = useForm();

  const notify = (message) => toast(message);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const response = await getAllTestimonies();
      setTestimonials(response.data);
    };
    fetchTestimonials();
  }, []);

  const handleOpenModal = (index = null) => {
    if (index !== null) {
      const testimonial = testimonials[index];
      reset({
        name: testimonial.name,
        contacts: testimonial.contacts,
        mainTestimony: testimonial.mainTestimony,
        company: testimonial.company,
        professional: testimonial.professional,
        service: testimonial.service,
        from: testimonial.from.split("T")[0], // Format date for input
        to: testimonial.to.split("T")[0], // Format date for input
      });
      setEditingIndex(index);
    } else {
      reset(); // Clear form if creating a new testimonial
      setEditingIndex(null);
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingIndex(null);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Manually append each field to FormData
    formData.append("name", data.name);
    formData.append("contacts", data.contacts);
    formData.append("mainTestimony", data.mainTestimony);
    formData.append("company", data.company);
    formData.append("professional", data.professional);
    formData.append("service", data.service);
    formData.append("from", data.from);
    formData.append("to", data.to);

    // Append image files
    if (data.image.length > 0) {
      formData.append("image", data.image[0]); // Assuming single image upload
    }

    if (data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append("images", data.images[i]); // Append multiple images
      }
    }

    formData.append("createdAt", new Date().toISOString());
    formData.append("updatedAt", new Date().toISOString());

    if (editingIndex !== null) {
      // Update testimonial
      await updateTestimonyById(testimonials[editingIndex]._id, formData);
      const updatedTestimonials = testimonials.map((item, index) =>
        index === editingIndex ? { ...item, ...data } : item
      );
      setTestimonials(updatedTestimonials);
      notify("Testimonial updated successfully!");
    } else {
      // Add new testimonial
      const response = await createTestimony(formData);
      setTestimonials([...testimonials, response.data]);
      notify("Testimonial added successfully!");
    }

    handleCloseModal();
  };

  const handleEdit = (params) => {
    const rowIndex = testimonials.findIndex((t) => t._id === params.row._id);
    handleOpenModal(rowIndex);
  };

  const handleDelete = async (id) => {
    await deleteTestimonyById(id);
    const updatedTestimonials = testimonials.filter((item) => item._id !== id);
    setTestimonials(updatedTestimonials);
    notify("Testimonial deleted successfully!");
  };

  const handleView = (params) => {
    setViewTestimonial(params.row);
  };

  const handleCloseViewModal = () => {
    setViewTestimonial(null);
  };

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value}
          alt={params.row.name}
          className="w-12 h-12 rounded-full"
        />
      ),
    },
    { field: "name", headerName: "Name", width: 150 },
    { field: "company", headerName: "Company", width: 150 },
    { field: "mainTestimony", headerName: "Testimony", width: 300 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleView(params)}
            className="bg-blue-500 text-white p-1 rounded"
          >
            View
          </button>
          <button
            onClick={() => handleEdit(params)}
            className="bg-yellow-500 text-white p-1 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(params.row._id)}
            className="bg-red-500 text-white p-1 rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const filteredTestimonials = testimonials.filter(
    (testimonial) =>
      testimonial.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Testimonials</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Name or Company"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded p-2 mb-4 w-full"
      />

      {/* Add Testimonial Button */}
      <button
        onClick={() => handleOpenModal()}
        className="bg-green-500 text-white p-2 mb-4 rounded"
      >
        Add Testimonial
      </button>

      <div className="h-96">
        <DataGrid
          rows={filteredTestimonials}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          getRowId={(row) => row._id}
          className="bg-white"
        />
      </div>

      <ToastContainer />

      {/* Modal for Adding/Editing Testimonial */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
      <div className="modal-container  bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto overflow-auto h-[90vh]">
        <div className="modal-header flex justify-between items-center mb-4">
          <h2 className="modal-title text-2xl font-semibold text-black">
            {editingIndex !== null ? "Edit Testimonial" : "Add Testimonial"}
          </h2>
          <button onClick={handleCloseModal} className="modal-close text-black text-lg font-bold">
            X
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="modal-form mb-4">
          {/* Name */}
          <div className="form-group mb-4">
            <label className="form-label text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
              className="form-input p-3 border rounded-lg w-full text-gray-700"
            />
            {errors.name && <span className="form-error text-red-500">{errors.name.message}</span>}
          </div>

          {/* Contacts */}
          <div className="form-group mb-4">
            <label className="form-label text-sm font-medium text-gray-700">Contacts:</label>
            <input
              type="text"
              placeholder="Contacts"
              {...register("contacts", { required: "Contacts are required" })}
              className="form-input p-3 border rounded-lg w-full text-gray-700"
            />
            {errors.contacts && <span className="form-error text-red-500">{errors.contacts.message}</span>}
          </div>

          {/* Main Testimony */}
          <div className="form-group mb-4">
            <label className="form-label text-sm font-medium text-gray-700">Main Testimony:</label>
            <textarea
              placeholder="Main Testimony"
              {...register("mainTestimony", { required: "Testimony is required" })}
              className="form-input p-3 border rounded-lg w-full text-gray-700"
            />
            {errors.mainTestimony && <span className="form-error text-red-500">{errors.mainTestimony.message}</span>}
          </div>

          {/* Company */}
          <div className="form-group mb-4">
            <label className="form-label text-sm font-medium text-gray-700">Company:</label>
            <input
              type="text"
              placeholder="Company"
              {...register("company", { required: "Company is required" })}
              className="form-input p-3 border rounded-lg w-full text-gray-700"
            />
            {errors.company && <span className="form-error text-red-500">{errors.company.message}</span>}
          </div>

          {/* Professional */}
          <div className="form-group mb-4">
            <label className="form-label text-sm font-medium text-gray-700">Professional:</label>
            <input
              type="text"
              placeholder="Professional"
              {...register("professional", { required: "Professional is required" })}
              className="form-input p-3 border rounded-lg w-full text-gray-700"
            />
            {errors.professional && <span className="form-error text-red-500">{errors.professional.message}</span>}
          </div>

          {/* Service */}
          <div className="form-group mb-4">
            <label className="form-label text-sm font-medium text-gray-700">Service:</label>
            <input
              type="text"
              placeholder="Service"
              {...register("service", { required: "Service is required" })}
              className="form-input p-3 border rounded-lg w-full text-gray-700"
            />
            {errors.service && <span className="form-error text-red-500">{errors.service.message}</span>}
          </div>

          {/* Date Inputs */}
          <div className="form-group mb-4">
            <label className="form-label text-sm font-medium text-gray-700">From:</label>
            <input
              type="date"
              {...register("from", { required: "From date is required" })}
              className="form-input p-3 border rounded-lg w-full text-gray-700"
            />
            {errors.from && <span className="form-error text-red-500">{errors.from.message}</span>}
          </div>

          <div className="form-group mb-4">
            <label className="form-label text-sm font-medium text-gray-700">To:</label>
            <input
              type="date"
              {...register("to", { required: "To date is required" })}
              className="form-input p-3 border rounded-lg w-full text-gray-700"
            />
            {errors.to && <span className="form-error text-red-500">{errors.to.message}</span>}
          </div>

          {/* Image Uploads */}
          <div className="form-group mb-4">
            <label className="form-label text-sm font-medium text-gray-700">Upload Image:</label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="form-file-input border p-2 mb-2 w-full rounded text-gray-700"
            />
          </div>
          <div className="form-group mb-4">
            <label className="form-label text-sm font-medium text-gray-700">Upload Additional Images:</label>
            <input
              type="file"
              accept="image/*"
              multiple
              {...register("images")}
              className="form-file-input border p-2 mb-2 w-full rounded text-gray-700"
            />
          </div>

          {/* Submit Button */}
          <div className="modal-footer flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={handleCloseModal}
              className="cancel-button bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              {editingIndex !== null ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </Modal>

      {/* View Testimonial Modal */}
      {viewTestimonial && (
        <Modal open={!!viewTestimonial} onClose={handleCloseViewModal}>
          <div className="bg-gray-800 p-4 rounded shadow-md max-w-lg mx-auto mt-32">
            <h2 className="text-xl font-bold mb-4">View Testimonial</h2>
            <p>
              <strong>Name:</strong> {viewTestimonial.name}
            </p>
            <p>
              <strong>Company:</strong> {viewTestimonial.company}
            </p>
            <p>
              <strong>Testimony:</strong> {viewTestimonial.mainTestimony}
            </p>
            <p>
              <strong>From:</strong> {viewTestimonial.from}
            </p>
            <p>
              <strong>To:</strong> {viewTestimonial.to}
            </p>
            <img
              src={viewTestimonial.image}
              alt={viewTestimonial.name}
              className="w-full mb-4 rounded"
            />
            <button
              onClick={handleCloseViewModal}
              className="bg-red-500 text-white p-2 rounded"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TestimonialsMngt;
