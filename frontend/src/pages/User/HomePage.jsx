import { useSelector } from 'react-redux';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile'); // Redirect to user profile
  };

  return (
    <Container>
      <h1>Welcome, {user?.name || 'Guest'}!</h1>
      <Button variant="primary" onClick={handleProfileClick}>Go to Profile</Button>
    </Container>
  );
};

export default HomePage;
