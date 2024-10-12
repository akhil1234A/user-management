import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, editUser, deleteUser, selectAllUsers } from '../../slices/adminSlice';
import Navbar from '../../components/Navbar';
import SearchBar from '../../components/SearchBar';
import UserTable from '../../components/UserTable';
import UserModal from '../../components/UserModal';
import { toast } from 'react-toastify';

const AdminPage = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectAllUsers);
    const { status, error } = useSelector((state) => state.admin); // Select loading and error states
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const filteredUsers = users.filter(user =>
        user && user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsers()); // Fetch users only if idle
        }
    }, [dispatch, status]);

    // Handle authorization error or any other errors
    useEffect(() => {
        if (error) {
            toast.error(error.message || 'Failed to load users.'); // Notify the user of an error
        }
    }, [error]);

    const handleEdit = useCallback((user) => {
        setSelectedUser(user);
        setShowModal(true);
    }, []);

    const handleDelete = useCallback((id) => {
        dispatch(deleteUser(id)).then(response => {
            if (response.error) {
                toast.error(response.error.message || 'Failed to delete user.'); // Notify of deletion error
            } else {
                toast.success('User deleted successfully'); // Notify of successful deletion
            }
        });
    }, [dispatch]);

    const handleSave = useCallback((data) => {
        if (selectedUser) {
            dispatch(editUser({ id: selectedUser._id, userData: data })).then(response => {
                if (response.error) {
                    toast.error(response.error.message || 'Failed to edit user.'); // Notify of editing error
                } else {
                    toast.success('User edited successfully');
                    dispatch(fetchUsers()); // Re-fetch users after editing
                }
            });
        } else {
            dispatch(addUser(data)).then(response => {
                if (response.error) {
                    toast.error(response.error.message || 'Failed to add user.'); // Notify of adding error
                } else {
                    toast.success('User added successfully');
                    dispatch(fetchUsers()); // Re-fetch users after adding
                }
            });
        }
        setShowModal(false);
        setSelectedUser(null); // Reset selection
    }, [dispatch, selectedUser]);

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                {/* Error Alert */}
                {error && <div className="alert alert-danger">{error.message || error}</div>}

                {/* Loading Spinner */}
                {status === 'loading' ? (
                    <div className="text-center my-5">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                        <UserTable users={filteredUsers} onEdit={handleEdit} onDelete={handleDelete} />
                        <button
                            className="btn btn-primary mt-3"
                            onClick={() => { setShowModal(true); setSelectedUser(null); }}
                            disabled={status === 'loading'} // Disable button if loading
                            aria-label="Add User"
                        >
                            Add User
                        </button>

                        {/* Conditionally render UserModal */}
                        {showModal && (
                            <UserModal
                                show={showModal}
                                handleClose={() => setShowModal(false)}
                                user={selectedUser}
                                onSave={handleSave}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
