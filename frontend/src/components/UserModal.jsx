import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';

const UserModal = ({ show, handleClose, user, onSave, roles = ['admin', 'user'] }) => {
    const [formData, setFormData] = useState({ name: '', email: '', role: '', password: '', image: null });
    const [errors, setErrors] = useState({});
    const firstInputRef = useRef(null); // Reference for the first input field

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                role: user.role,
                password: '', // Clear password when editing
                image: null // Clear image when editing
            });
        } else {
            setFormData({ name: '', email: '', role: '', password: '', image: null });
        }
        setErrors({}); // Reset errors when modal opens
    }, [user, show]);

    useEffect(() => {
        if (show) {
            firstInputRef.current?.focus(); // Auto focus on first field when modal opens
        }
    }, [show]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        const newFormData = { 
            ...formData, 
            [name]: type === 'file' ? files[0] : value 
        };

        // Perform validation on change
        const validationErrors = validate(newFormData); // Pass the new form data for validation
        setFormData(newFormData);
        setErrors(validationErrors); // Update errors based on new input
    };

    const validate = (data) => {
        const newErrors = {};
        if (!data.name) newErrors.name = 'Name is required';
        if (!data.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(data.email)) newErrors.email = 'Email is invalid'; // Custom email validation
        if (!data.role) newErrors.role = 'Role is required';
        if (!user && !data.password) newErrors.password = 'Password is required'; // Password is only required when adding a user
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }

        const userData = new FormData();
        userData.append('name', formData.name);
        userData.append('email', formData.email);
        userData.append('role', formData.role);
        if (formData.password) userData.append('password', formData.password); // Include password only when adding
        if (formData.image) userData.append('image', formData.image); // Include image if provided

        onSave(userData);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{user ? 'Edit User' : 'Add User'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text"
                            ref={firstInputRef} // Auto-focus on first field
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="role">Role</label>
                        <select 
                            className={`form-control ${errors.role ? 'is-invalid' : ''}`} 
                            name="role" 
                            value={formData.role} 
                            onChange={handleChange} 
                            required
                        >
                            <option value="">Select Role</option>
                            {roles.map((role) => (
                                <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
                            ))}
                        </select>
                        {errors.role && <div className="invalid-feedback">{errors.role}</div>}
                    </div>
                    {!user && ( // Show password field only when adding a user
                        <div className="mb-3">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                                name="password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                required 
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                    )}
                    <div className="mb-3">
                        <label htmlFor="image">Profile Image</label>
                        <input 
                            type="file" 
                            className="form-control" 
                            name="image" 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="d-flex justify-content-between">
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary">
                            Save
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default UserModal;
