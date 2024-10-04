import "react-quill/dist/quill.snow.css";
import "./ServiceManagement.css";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import axios from "axios";
import { Box, Button, Input, Modal, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";

import {
  createService,
  getAllServices,
  updateServiceById,
  deleteServiceById,
} from "../../../apirequest/serviceApi";

const ServiceManagementModule = () => {
  const [services, setServices] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [imageChanged, setImageChanged] = useState(false);
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

  // Fetch all services when the component mounts
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const fetchedServices = await getAllServices();
        setServices(fetchedServices.data || []);  // Ensure it's always an array
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);
  const handleOpenViewModal = (service) => {
    setCurrentService(service); // Store the service to be viewed
    setViewModalOpen(true);     // Open the view modal
  };
  
  const handleOpenModal = (service) => {
    setImagePreview(service ? service.image : "");
    setIsEditing(!!service);
    reset(service || {
      id: null,
      image: "",
      alt: "",
      title: "",
      description: "",
      overlayTitle: "",
      overlayDescription: "",
      overlayLink: "",
    });
    setCurrentService(service || null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setViewModalOpen(false);
    setImagePreview("");
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    const { title, description, overlayTitle, overlayDescription, overlayLink, image } = data;
    

    formData.append('title', title);
    formData.append('description', description);
    formData.append('overlayTitle', overlayTitle);
    formData.append('overlayDescription', overlayDescription);
    formData.append('overlayLink', overlayLink);
    const hasFile = [...formData.entries()].some(([key, value]) => value instanceof File);

    // Only append the image if it's a new one
    if ((image && image.length > 0) && (image !== currentService?.image)) {
      formData.append('image', image[0]); // Add the new image
    } else if (currentService && currentService.image) {
      formData.append('image', currentService.image); // Retain the old image if no new image is uploaded
    }

    try {
      let response;
      if (isEditing) {
        response = await updateServiceById(currentService._id, formData);
        setServices(services.map(service =>
          service._id === currentService._id ? response.data : service
        ));
      } else {
        response = await createService(formData);
        setServices([...services, response.data]);
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  const handleDeleteService = async (id) => {
    try {
      await deleteServiceById(id);
      setServices(services.filter((service) => service._id !== id));
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setValue("image", e.target.files); // Store the file for FormData
      setImageChanged(true); // Set flag to true as image has changed
    }
  };

  const filteredServices = services.filter(service =>
    (service?.title?.toLowerCase().includes(searchTerm.toLowerCase()) || "") ||
    (service?.description?.toLowerCase().includes(searchTerm.toLowerCase()) || "")
  );

  const columns = [
    { field: "_id", headerName: "Id", width: 70 },
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img src={params.value} alt="Service" style={{ width: "50px", height: "50px", borderRadius: "4px" }} />
      ),
    },
    { field: "title", headerName: "Title", width: 250 },
    {
      field: "description",
      headerName: "Description",
      width: 400,
      renderCell: (params) => (
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(params.value).slice(0, 100), // Safely render sanitized description
          }}
        />
      ),
    },
    { field: "overlayLink", headerName: "Link", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "5px" }}>
          <Button onClick={() => handleOpenModal(params.row)} variant="contained" color="primary" size="small">
            Edit
          </Button>
          <Button onClick={() => handleOpenViewModal(params.row)} variant="outlined" color="info" size="small">
            View
          </Button>
          <Button
            onClick={() => handleDeleteService(params.row._id)}
            variant="outlined"
            color="error"
            size="small"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom align="center">Service Management</Typography>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        style={{ marginBottom: '20px' }}
      />
      <Button variant="contained" color="primary" onClick={() => handleOpenModal(null)} style={{ marginBottom: '20px' }}>
        Add Service
      </Button>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={filteredServices}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          autoHeight
          className="bg-white"
          getRowId={(row) => row._id}
        />
      </div>

  {/* Modal for adding/editing a service */}
{/* Modal for adding/editing a service */}
<Modal 
open={modalOpen} 
 
onClose={handleCloseModal}
>
  <Box
  className="modal-content  h-[70vh] overflow-y-auto"
    sx={{
      padding: 3,
      backgroundColor: 'white',
      margin: '50px auto',
      width: '90%',
      borderRadius: 2,
      boxShadow: 3,
    }}
  >
    <Typography
      variant="h6"
      align="center"
      className="form-heading text-2xl font-semibold text-black"
    >
      {isEditing ? 'Edit Service' : 'Add Service'}
    </Typography>

    <form onSubmit={handleSubmit(onSubmit)} className="modal-form">
      
      {/* Group 1: Title vs Overlay Title */}
      <div className="form-grouping">
        <div className="formgroup">
          <label className="formlabel text-sm font-medium text-gray-700">Title</label>
          <ReactQuill
            className="forminput p-3 border rounded-lg w-full text-gray-700"
            value={currentService?.title || ''}
            onChange={(value) => setValue('title', value)}
          />
          {errors.title && (
            <Typography color="error">Title is required</Typography>
          )}
        </div>

        <div className="formgroup">
          <label className="formlabel text-sm font-medium text-gray-700">Overlay Title</label>
          <ReactQuill
            className="forminput p-3 border rounded-lg w-full text-gray-700"
            value={currentService?.overlayTitle || ''}
            onChange={(value) => setValue('overlayTitle', value)}
          />
        </div>
      </div>

      {/* Group 2: Description vs Overlay Description */}
      <div className="form-grouping">
        <div className="formgroup">
          <label className="formlabel text-sm font-medium text-gray-700">Description</label>
          <ReactQuill
            className="forminput p-3 border rounded-lg w-full text-gray-700"
            value={currentService?.description || ''}
            onChange={(value) => setValue('description', value)}
          />
          {errors.description && (
            <Typography color="error">Description is required</Typography>
          )}
        </div>

        <div className="formgroup">
          <label className="formlabel text-sm font-medium text-gray-700">Overlay Description</label>
          <ReactQuill
            className="forminput p-3 border rounded-lg w-full text-gray-700"
            value={currentService?.overlayDescription || ''}
            onChange={(value) => setValue('overlayDescription', value)}
          />
        </div>
      </div>

      {/* Group 3: Overlay Link vs Image */}
      <div className="form-grouping">
        <div className="formgroup">
          <label className="formlabel text-sm font-medium text-gray-700">Overlay Link</label>
          <input
            className="forminput p-3 border rounded-lg w-full text-gray-700"
            {...register('overlayLink')}
          />
        </div>

        <div className="formgroup">
          <label className="formlabel text-sm font-medium text-gray-700">Image Upload</label>
          <input
            type="file"
            accept="image/*"
            className="forminput p-3 border rounded-lg w-full text-gray-700"

   {...register('image')}/>
          {/* {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: '100%', height: 'auto', marginTop: '10px' }}
            />
          )} */}
        </div>
      </div>

      {/* Action buttons */}
      <div className="action-buttons" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button className="btn-primary" type="submit">
          {isEditing ? 'Update' : 'Add'}
        </button>
        <button className="btn-secondary" onClick={handleCloseModal}>
          Cancel
        </button>
      </div>
    </form>
  </Box>
</Modal>


    </div>
  );
};

export default ServiceManagementModule;
