import React, { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const ContactsManagementModule = () => {
    const [contacts, setContacts] = useState([]); // State to hold contact messages
    const [replyModalOpen, setReplyModalOpen] = useState(false); // Modal state for replying
    const [currentContact, setCurrentContact] = useState(null); // Current contact being replied to

    // Sample data for demonstration
    const sampleMessages = [
        { id: 1, name: "Alice", email: "alice@example.com", telephone: "+250123456789", subject: "Project Inquiry", message: "I'd like to discuss a project.", replied: false },
        { id: 2, name: "Bob", email: "bob@example.com", telephone: "+250987654321", subject: "Technical Support", message: "Need help with an issue.", replied: true },
        // Add more messages as needed
    ];

    // Load sample messages into state (this can be replaced with an API call)
    const loadSampleMessages = () => {
        setContacts(sampleMessages);
    };

    // Open reply modal
    const handleOpenReplyModal = (contact) => {
        setCurrentContact(contact);
        setReplyModalOpen(true);
    };

    // Close reply modal
    const handleCloseReplyModal = () => {
        setReplyModalOpen(false);
        setCurrentContact(null);
    };

    // Send reply (simulated)
    const handleSendReply = () => {
        alert(`Reply sent to ${currentContact.email}`);
        setContacts((prev) =>
            prev.map((contact) =>
                contact.id === currentContact.id ? { ...contact, replied: true } : contact
            )
        );
        handleCloseReplyModal(); // Close modal after sending
    };

    // Delete contact message
    const handleDeleteContact = (id) => {
        setContacts(contacts.filter((contact) => contact.id !== id));
    };

    // Columns for the DataGrid
    const columns = [
        { field: "name", headerName: "Name", width: 150 },
        { field: "email", headerName: "Email", width: 200 },
        { field: "telephone", headerName: "Telephone", width: 150 },
        { field: "subject", headerName: "Subject", width: 200 },
        { field: "message", headerName: "Message", width: 300 },
        { field: "replied", headerName: "Replied", width: 100, renderCell: (params) => (params.value ? "Yes" : "No") },
        {
            field: "actions",
            headerName: "Actions",
            width: 250,
            renderCell: (params) => (
                <>
                    <Button variant="outlined" onClick={() => handleOpenReplyModal(params.row)}>Reply</Button>
                    <Button variant="outlined" onClick={() => handleDeleteContact(params.row.id)}>Delete</Button>
                    <Button variant="outlined" onClick={() => window.open(`https://wa.me/${params.row.telephone}`, "_blank")}>WhatsApp</Button>
                    <Button variant="outlined" onClick={() => window.open(`tel:${params.row.telephone}`, "_self")}>Call</Button>
                </>
            ),
        },
    ];

    return (
        <Box className="contacts-management">
            <h2>Contact Management</h2>
            <Button variant="contained" color="primary" onClick={loadSampleMessages}>
                Load Sample Messages
            </Button>

            {/* DataGrid for displaying contacts */}
            <div style={{ height: 400, width: '100%', marginTop: 20 }}>
                <DataGrid rows={contacts} columns={columns} pageSize={5} />
            </div>

            {/* Reply Modal */}
            <Modal open={replyModalOpen} onClose={handleCloseReplyModal}>
                <Box sx={{ padding: 2, backgroundColor: 'white', margin: '100px auto', maxWidth: 400 }}>
                    <Typography variant="h6">Reply to {currentContact?.name}</Typography>
                    <TextField
                        label="Reply Message"
                        multiline
                        rows={4}
                        fullWidth
                        placeholder="Type your reply here..."
                    />
                    <Button variant="contained" color="primary" onClick={handleSendReply} style={{ marginTop: '20px' }}>
                        Send Reply
                    </Button>
                    <Button variant="outlined" onClick={handleCloseReplyModal} style={{ marginTop: '20px', marginLeft: '10px' }}>
                        Cancel
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default ContactsManagementModule;
