import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile, loadUserProfile } from '../../slices/userSlice'; // Import loadUserProfile
import { toast } from 'react-toastify';

const EditProfileModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user.profile); 

  // Form states for input fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Pre-fill form fields with existing user profile data
  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || '');
      setEmail(userProfile.email || '');
      setProfileImage(null); // Reset the image preview when modal opens
    }
  }, [userProfile, isOpen]);

  // Handle profile update submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true); 

    // Create form data to send
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (password) formData.append('password', password); // Password is optional
    if (profileImage) formData.append('image', profileImage);

    try {
      await dispatch(updateUserProfile(formData)).unwrap();
      toast.success('Profile updated successfully!');
      
      // Refresh profile data after update
      await dispatch(loadUserProfile()).unwrap(); // Dispatch loadUserProfile to refresh data
      onClose(); // Close the modal after a successful update
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update profile, please try again.';
      toast.error(errorMessage);
      console.error(err); // Log error for debugging
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Profile</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleUpdate}>
              {/* Name Field */}
              <div className="form-group mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Email Field */}
              <div className="form-group mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Field */}
              <div className="form-group mb-3">
                <label htmlFor="password" className="form-label">Password (leave blank to keep current)</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>

              {/* Profile Image Upload */}
              <div className="form-group mb-3">
                <label htmlFor="profileImage" className="form-label">Profile Image</label>
                <input
                  type="file"
                  id="profileImage"
                  className="form-control"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                />
                {profileImage && (
                  <img
                    src={URL.createObjectURL(profileImage)}
                    alt="Profile Preview"
                    className="img-thumbnail mt-2"
                    style={{ width: '100px', height: '100px' }}
                  />
                )}
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
