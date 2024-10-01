import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Input, Modal, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";

import {
  createService,
  getAllServices,
  updateServiceById,
  deleteServiceById,
} from "../../../apirequest/serviceApi";

const ServiceManagement = () => {
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
    console.log("Contains files:", hasFile);
    // Only append the image if it's a new one
    if (image && image.length > 0) {
        formData.append('image', image[0]); // Add the new image
    } else if (currentService && currentService.image) {
        formData.append('image', currentService.image); // Retain the old image if no new image is uploaded
    }

    console.log("Contains files:", hasFile);
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

  const handleOpenViewModal = (service) => {
    setCurrentService(service);
    setViewModalOpen(true);
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

  // Safeguard against undefined
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
    { field: "description", headerName: "Description", width: 400 },
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
      className="searchbutton bg-slate-400"
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
      <Modal open={modalOpen} onClose={handleCloseModal} className="overflow-auto fixed inset-0 z-10">
        <Box sx={{
          padding: 3,
          backgroundColor: 'white',
          margin: '50px auto',
          width: '400px',
          borderRadius: 2,
          boxShadow: 3
        }}>
          <Typography variant="h6" align="center" className="text-gray-700">{isEditing ? "Edit Service" : "Add Service"}</Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Title"
              {...register("title", { required: true })}
              error={!!errors.title}
              helperText={errors.title ? "Title is required" : ""}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              {...register("description", { required: true })}
              error={!!errors.description}
              helperText={errors.description ? "Description is required" : ""}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Overlay Title"
              {...register("overlayTitle")}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Overlay Description"
              {...register("overlayDescription")}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Overlay Link"
              {...register("overlayLink")}
              fullWidth
              margin="normal"
            />

            <Input
                type='file'
                accept='image/*'
                name='image'
                {...register('image')}
              fullWidth
              style={{ marginTop: '10px' }}
            />
            {/* <TextField
              label="Image URL"
              {...register("image")}
              value={imagePreview || ""}
              fullWidth
              margin="normal"
              placeholder="Or paste image URL here"
            />
             */}

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: '100%', height: 'auto', marginTop: '10px' }}
              />
            )}

            <Box display="flex" justifyContent="space-between" marginTop="20px">
              <Button variant="contained" color="primary" type="submit">
                {isEditing ? "Update" : "Add"}
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      {/* View Modal for displaying a service */}
      <Modal open={viewModalOpen} onClose={handleCloseModal} className="overflow-auto fixed inset-0 z-10">
        <Box sx={{
          padding: 3,
          backgroundColor: 'white',
          margin: '50px auto',
          width: '400px',
          borderRadius: 2,
          boxShadow: 3,
          className: 'box bg-blue-400'
        }}>
          <Typography variant="h6" align="center" className="text-gray-700">View Service</Typography>
          {currentService && (
            <>
              <img
                src={currentService.image}
                alt="Service"
                style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
              />
              <Typography variant="body1"><strong>Title:</strong> {currentService.title}</Typography>
              <Typography variant="body1"><strong>Description:</strong> {currentService.description}</Typography>
              <Typography variant="body1"><strong>Overlay Title:</strong> {currentService.overlayTitle}</Typography>
              <Typography variant="body1"><strong>Overlay Description:</strong> {currentService.overlayDescription}</Typography>
              <Typography variant="body1"><strong>Link:</strong> {currentService.overlayLink}</Typography>
            </>
          )}
          <Button variant="outlined" color="secondary" onClick={handleCloseModal} style={{ marginTop: '20px' }}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ServiceManagement;
