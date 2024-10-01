import React, { useState } from "react";
import { Box, Button, Card, CardContent, CardMedia, Modal, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { education } from "../../data/about";

const EducationTable = () => {
    const [educationData, setEducationData] = useState(education);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false); // State for viewing details modal

    const handleOpenModal = (item) => {
        setCurrentItem(item || { id: Date.now(), institution: "", degree: "", duration: "", description: "", logo: "" });
        setIsEditing(!!item);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setCurrentItem(null);
    };

    const handleViewDetails = (item) => {
        setCurrentItem(item);
        setViewModalOpen(true);
    };

    const handleCloseViewModal = () => {
        setViewModalOpen(false);
        setCurrentItem(null);
    };

    const handleSave = () => {
        if (isEditing) {
            setEducationData(educationData.map((edu) => (edu.id === currentItem.id ? currentItem : edu)));
        } else {
            setEducationData([...educationData, { ...currentItem, id: Date.now() }]);
        }
        handleCloseModal();
    };

    const handleDelete = (itemId) => {
        setEducationData(educationData.filter((edu) => edu.id !== itemId));
    };

    const columns = [
        { field: "institution", headerName: "Institution", width: 250 },
        { field: "degree", headerName: "Degree", width: 250 },
        { field: "duration", headerName: "Duration", width: 150 },
        {
            field: "actions",
            headerName: "Actions",
            width: 300,
            renderCell: (params) => (
                <>
                    <Button onClick={() => handleOpenModal(params.row)}>Edit</Button>
                    <Button onClick={() => handleDelete(params.row.id)}>Delete</Button>
                    <Button onClick={() => handleViewDetails(params.row)}>View</Button>
                </>
            ),
        },
    ];

    return (
        <Box>
            <Button onClick={() => handleOpenModal()} variant="contained" color="primary">
                Add Education
            </Button>
            <DataGrid rows={educationData} columns={columns} pageSize={5} />

            {/* Modal for adding/editing education */}
            <Modal open={modalOpen} onClose={handleCloseModal}>
                <Box sx={{ padding: 2, backgroundColor: 'white', margin: '100px auto', maxWidth: 400 }}>
                    <Typography variant="h6">{isEditing ? "Edit Education" : "Add Education"}</Typography>
                    <TextField
                        label="Institution"
                        value={currentItem?.institution || ""}
                        onChange={(e) => setCurrentItem({ ...currentItem, institution: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Degree"
                        value={currentItem?.degree || ""}
                        onChange={(e) => setCurrentItem({ ...currentItem, degree: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Duration"
                        value={currentItem?.duration || ""}
                        onChange={(e) => setCurrentItem({ ...currentItem, duration: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Description"
                        value={currentItem?.description || ""}
                        onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Logo URL"
                        value={currentItem?.logo || ""}
                        onChange={(e) => setCurrentItem({ ...currentItem, logo: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: '20px' }}>
                        Save
                    </Button>
                </Box>
            </Modal>

            {/* Modal for viewing details */}
            <Modal open={viewModalOpen} onClose={handleCloseViewModal}>
                <Box sx={{ padding: 2, backgroundColor: 'white', margin: '100px auto', maxWidth: 400 }}>
                    <Typography variant="h6">Education Details</Typography>
                    <Card sx={{ marginTop: 2 }}>
                        {currentItem?.logo && (
                            <CardMedia
                                component="img"
                                height="140"
                                image={currentItem.logo}
                                alt={currentItem.institution}
                            />
                        )}
                        <CardContent>
                            <Typography variant="h6">{currentItem?.institution}</Typography>
                            <Typography variant="body1">{currentItem?.degree}</Typography>
                            <Typography variant="body2">{currentItem?.duration}</Typography>
                            <Typography variant="body2">{currentItem?.description}</Typography>
                        </CardContent>
                    </Card>
                    <Button variant="contained" color="secondary" onClick={handleCloseViewModal} style={{ marginTop: '20px' }}>
                        Close
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default EducationTable;
