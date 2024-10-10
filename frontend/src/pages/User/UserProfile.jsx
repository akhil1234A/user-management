import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import defaultImage from '../../assets/profile.png'; // Renamed import for clarity

const UserProfile = () => {
  console.log('User Profile');
  const [profile, setProfile] = useState({ name: '', email: '', image: '' });
  const [uploadedImage, setUploadedImage] = useState(null); // Renamed state variable
  const { token } = useSelector((state) => state.auth);
  console.log('Token: ', token);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };
    fetchProfile();
  }, [token]);

  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const formData = new FormData();
      formData.append('name', profile.name);
      formData.append('email', profile.email);
      if (uploadedImage) formData.append('image', uploadedImage); // Updated to use uploadedImage

      // Update user profile
      await axios.put('http://localhost:3000/api/users/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Profile updated successfully');
      // Optionally fetch the profile again to update the state
      fetchProfile();
    } catch (error) {
      console.error('Error updating profile', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleFileChange = (e) => {
    setUploadedImage(e.target.files[0]); // Updated to use uploadedImage
  };

  return (
    <Container>
      <h2>User Profile</h2>
      <Form onSubmit={handleUpdate}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                value={profile.name} 
                onChange={(e) => setProfile({ ...profile, name: e.target.value })} 
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                value={profile.email} 
                onChange={(e) => setProfile({ ...profile, email: e.target.value })} 
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formImage">
          <Form.Label>Profile Image</Form.Label>
          <Form.Control 
            type="file" 
            onChange={handleFileChange} 
          />
          <img 
            src={profile.image ? profile.image : 'https://via.placeholder.com/150'} // Use a placeholder image if profile.image is not available
            alt="Profile" 
            style={{ width: '150px', marginTop: '10px' }} 
          />
        </Form.Group>

        <Button variant="primary" type="submit">Update Profile</Button>
      </Form>
    </Container>
  );
};

export default UserProfile;
