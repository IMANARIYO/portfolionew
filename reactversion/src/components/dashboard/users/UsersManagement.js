import React, { useEffect, useState } from "react";
import UserService from "../../../apirequest/UserServiceApi";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

// import UserService from "./api";

const UsersManagement = () => {
    const [users, setUsers] = useState([]); // State to hold user data
    const [modalOpen, setModalOpen] = useState(false); // Modal state for adding/editing user
    const [currentUser, setCurrentUser] = useState(null); // Current user being edited
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        loadUsers(); // Load users when component mounts
    }, []);

    // Load users from the backend
    const loadUsers = async () => {
        try {
            setLoading(true);
            const response = await UserService.getAllUsers(); // Use the actual API call
            setUsers(response.data); // Set the users from the response
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch users:", error);
            setLoading(false);
        }
    };

    // Function to add a new user
    const addUser = async (userData) => {
        try {
            await UserService.signup(userData); // Call the signup API to add a user
            loadUsers(); // Reload users after adding
        } catch (error) {
            console.error("Failed to add user:", error);
        }
    };

    // Function to edit an existing user
    const editUser = async (id, userData) => {
        try {
            await UserService.updateUserById(id, userData); // Call the update API to edit a user
            loadUsers(); // Reload users after editing
        } catch (error) {
            console.error("Failed to edit user:", error);
        }
    };

    // Function to delete a user
    const deleteUser = async (id) => {
        try {
            // You can add a delete API call if it exists in your UserService
            // e.g., await UserService.deleteUser(id);
            console.log(`Deleting user ${id} - you need to implement this in your API.`);
            loadUsers(); // Reload users after deletion
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    // Open modal for adding a new user
    const handleAddUser = () => {
        setCurrentUser(null); // Reset currentUser to null when adding a new user
        setModalOpen(true); // Open modal
    };

    // Open modal for editing an existing user
    const handleEditUser = (user) => {
        setCurrentUser(user); // Set the user to be edited
        setModalOpen(true); // Open modal
    };

    // Close the modal
    const handleCloseModal = () => {
        setModalOpen(false); // Close modal
        setCurrentUser(null); // Reset currentUser
    };

    // Save user (add/edit)
    const handleSaveUser = async () => {
        const userData = {
            fullNames: document.querySelector('input[placeholder="Full Names"]').value,
            email: document.querySelector('input[placeholder="Email"]').value,
            phoneNumber: document.querySelector('input[placeholder="Phone Number"]').value,
            role: document.querySelector('input[placeholder="Role"]').value,
        };

        if (currentUser) {
            await editUser(currentUser._id, userData); // Edit existing user
        } else {
            await addUser(userData); // Add new user
        }
        handleCloseModal(); // Close modal after saving
    };

    // Delete user
    const handleDeleteUser = async (id) => {
        await deleteUser(id); // Call the delete function
    };

    // Columns for the DataGrid
    const columns = [
        { field: 'fullNames', headerName: 'Full Names', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
        { field: 'role', headerName: 'Role', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 300,
            renderCell: (params) => (
                <>
                    <Button variant="outlined" onClick={() => handleEditUser(params.row)}>Edit</Button>
                    <Button variant="outlined" onClick={() => handleDeleteUser(params.row._id)}>Delete</Button>
                </>
            ),
        },
    ];

    return (
        <Box className="users-management">
            <Typography variant="h4">User Management</Typography>
            <Button variant="contained" color="primary" onClick={handleAddUser}>
                Add User
            </Button>

            {/* DataGrid for displaying users */}
            <div style={{ height: 400, width: '100%', marginTop: 20 }}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    pageSize={5}
                    getRowId={(row) => row._id} // Use _id as the unique identifier
                    loading={loading} // Show loading state if data is being fetched
                />
            </div>

            {/* User Modal */}
            <Modal open={modalOpen} onClose={handleCloseModal}>
                <Box sx={{ padding: 2, backgroundColor: 'white', margin: '100px auto', maxWidth: 400 }}>
                    <Typography variant="h6">{currentUser ? 'Edit User' : 'Add User'}</Typography>
                    <TextField
                        label="Full Names"
                        fullWidth
                        required
                        defaultValue={currentUser ? currentUser.fullNames : ''}
                        placeholder="Full Names"
                    />
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        required
                        defaultValue={currentUser ? currentUser.email : ''}
                        placeholder="Email"
                    />
                    <TextField
                        label="Phone Number"
                        fullWidth
                        defaultValue={currentUser ? currentUser.phoneNumber : ''}
                        placeholder="Phone Number"
                    />
                    <TextField
                        label="Role"
                        fullWidth
                        defaultValue={currentUser ? currentUser.role : ''}
                        placeholder="Role"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSaveUser}
                        style={{ marginTop: '20px' }}
                    >
                        Save User
                    </Button>
                    <Button variant="outlined" onClick={handleCloseModal} style={{ marginTop: '20px', marginLeft: '10px' }}>
                        Cancel
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default UsersManagement;
