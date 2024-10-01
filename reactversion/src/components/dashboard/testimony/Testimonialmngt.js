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
  const { register, handleSubmit, reset } = useForm();

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
      const createdTestimonial = await createTestimony(formData);
      setTestimonials([...testimonials, createdTestimonial]);
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
        <div className="bg-gray-950 p-4 rounded shadow-md max-w-lg mx-auto overflow-auto">
          <h2 className="text-xl font-bold mb-4">
            {editingIndex !== null ? "Edit Testimonial" : "Add Testimonial"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: true })}
              className="border p-2 mb-2 w-full rounded"
            />
            <input
              type="text"
              placeholder="Contacts"
              {...register("contacts", { required: true })}
              className="border p-2 mb-2 w-full rounded"
            />
            <textarea
              placeholder="Main Testimony"
              {...register("mainTestimony", { required: true })}
              className="border p-2 mb-2 w-full rounded"
            />
            <input
              type="text"
              placeholder="Company"
              {...register("company", { required: true })}
              className="border p-2 mb-2 w-full rounded"
            />
            <input
              type="text"
              placeholder="Professional"
              {...register("professional", { required: true })}
              className="border p-2 mb-2 w-full rounded"
            />
            <input
              type="text"
              placeholder="Service"
              {...register("service", { required: true })}
              className="border p-2 mb-2 w-full rounded"
            />
            <label className="block mb-1">From:</label>
            <input
              type="date"
              {...register("from", { required: true })}
              className="border p-2 mb-2 w-full rounded"
            />
            <label className="block mb-1">To:</label>
            <input
              type="date"
              {...register("to", { required: true })}
              className="border p-2 mb-2 w-full rounded"
            />
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="border p-2 mb-2 w-full rounded"
            />
            <input
              type="file"
              accept="image/*"
              multiple
              {...register("images")}
              className="border p-2 mb-2 w-full rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              {editingIndex !== null ? "Update" : "Add"}
            </button>
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
