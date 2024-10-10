import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../slices/authSlice';
import { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // State for error messages
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:3000/api/users/login', { email, password });
            dispatch(login({ user: data.user, token: data.token }));
            console.log('User after login: user',user);
            console.log("User after login:", data.user); // Log user data
            navigate('/home'); // Redirect to home page
        } catch (error) {
            console.error('Login failed', error);
            setErrorMessage('Login failed. Please check your credentials.'); // Show error message
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={4}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </Form.Group>

                        {errorMessage && <p className="text-danger">{errorMessage}</p>} {/* Display error message */}

                        <Button variant="primary" type="submit">Login</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
