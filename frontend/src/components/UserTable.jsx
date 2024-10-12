import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const UserTable = ({ users, onEdit, onDelete }) => {
    const { role } = useSelector((state) => state.auth); // Get the user's role from the Redux store

    const handleDelete = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            onDelete(userId);
        }
    };

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Edit User
        </Tooltip>
    );

    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user._id} className="table-row">
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    {/* Only show Edit button if the user is an admin */}
                                    {role === 'admin' && (
                                        <OverlayTrigger placement="top" overlay={renderTooltip}>
                                            <button
                                                className="btn btn-warning btn-sm mr-2"
                                                onClick={() => onEdit(user)}
                                            >
                                                Edit
                                            </button>
                                        </OverlayTrigger>
                                    )}
                                    {/* Only show Delete button if the user is an admin */}
                                    {role === 'admin' && (
                                        <button
                                            className="btn btn-danger btn-sm ms-3"
                                            onClick={() => handleDelete(user._id)}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
