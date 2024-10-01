import React, { useEffect, useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const UsersManagement = () => {
    const [users, setUsers] = useState([]); // State to hold user data
    const [modalOpen, setModalOpen] = useState(false); // Modal state for adding/editing user
    const [currentUser, setCurrentUser] = useState(null); // Current user being edited

    useEffect(() => {
        loadUsers(); // Load users when component mounts
    }, []);

    // Load users from the backend (placeholder API call)
    const loadUsers = async () => {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
    };

    // Placeholder function for fetching users from an API
    const fetchUsers = async () => {
        // Replace with actual API call
        return [
            { _id: '1', fullNames: 'Alice Johnson', email: 'alice@example.com', phoneNumber: '123-456-7890', role: 'Admin' },
            { _id: '2', fullNames: 'Bob Smith', email: 'bob@example.com', phoneNumber: '987-654-3210', role: 'User' },
            { _id: '3', fullNames: 'Charlie Brown', email: 'charlie@example.com', phoneNumber: '555-123-4567', role: 'User' },
        ];
    };

    // Placeholder function for adding a user
    const addUser = async (userData) => {
        console.log("Adding user:", userData);
    };

    // Placeholder function for editing a user
    const editUser = async (id, userData) => {
        console.log("Editing user:", id, userData);
    };

    // Placeholder function for deleting a user
    const deleteUser = async (id) => {
        console.log("Deleting user:", id);
    };

    // Open modal for adding a new user
    const handleAddUser = () => {
        setCurrentUser(null);
        setModalOpen(true);
    };

    // Open modal for editing an existing user
    const handleEditUser = (user) => {
        setCurrentUser(user);
        setModalOpen(true);
    };

    // Close the modal
    const handleCloseModal = () => {
        setModalOpen(false);
        setCurrentUser(null);
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
            await editUser(currentUser._id, userData);
        } else {
            await addUser(userData);
        }
        loadUsers(); // Reload users
        handleCloseModal(); // Close modal
    };

    // Delete user
    const handleDeleteUser = async (id) => {
        await deleteUser(id);
        loadUsers(); // Reload users
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
                    />
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        required
                        defaultValue={currentUser ? currentUser.email : ''}
                    />
                    <TextField
                        label="Phone Number"
                        fullWidth
                        defaultValue={currentUser ? currentUser.phoneNumber : ''}
                    />
                    <TextField
                        label="Role"
                        fullWidth
                        defaultValue={currentUser ? currentUser.role : ''}
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
