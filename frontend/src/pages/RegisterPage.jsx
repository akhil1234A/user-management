import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../slices/userSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
   Container,
   Typography,
   TextField,
   Button,
   Snackbar,
   Alert,
   CircularProgress,
} from '@mui/material';

const RegisterPage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);
   const [open, setOpen] = useState(false);

   const handleRegister = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);

      try {
         const response = await axios.post('http://localhost:3000/api/users/register', { name, email, password });
         dispatch(loginSuccess(response.data));
         navigate('/home');
      } catch (error) {
         console.error('Registration error:', error);
         setError(error.response?.data.message || 'Registration failed');
         setOpen(true); // Show snackbar for error message
      } finally {
         setLoading(false);
      }
   };

   const handleCloseSnackbar = () => {
      setOpen(false);
   };

   return (
      <Container maxWidth="xs" style={{ marginTop: '2rem' }}>
         <Typography variant="h4" component="h1" align="center" gutterBottom>
            Register
         </Typography>
         <form onSubmit={handleRegister}>
            <TextField
               label="Name"
               variant="outlined"
               fullWidth
               margin="normal"
               value={name}
               onChange={(e) => setName(e.target.value)}
               required
            />
            <TextField
               label="Email"
               variant="outlined"
               type="email"
               fullWidth
               margin="normal"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
            />
            <TextField
               label="Password"
               variant="outlined"
               type="password"
               fullWidth
               margin="normal"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required
            />
            <Button
               variant="contained"
               color="primary"
               type="submit"
               fullWidth
               disabled={loading}
               style={{ marginTop: '1rem' }}
            >
               {loading ? <CircularProgress size={24} /> : 'Register'}
            </Button>
         </form>
         <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
               {error}
            </Alert>
         </Snackbar>
      </Container>
   );
};

export default RegisterPage;
