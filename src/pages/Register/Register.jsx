import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Link,
  Button,
  IconButton,
  Grid,
  Box,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const Register = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isConfirmPass, setIsConfirmPass] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState('');

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(value)) {
      setEmailError(false);
      setEmailHelperText('');
    } else {
      setEmailError(true);
      setEmailHelperText('Invalid email format');
    }
  };

  const handleRegister = () => {
    setPasswordError(false);
    setPasswordHelperText('');
    if (pass !== isConfirmPass) {
      setPasswordError(true);
      setPasswordHelperText('Passwords do not match');
    }
  };
  return (
    <Container
      maxWidth="xs"
      sx={{
        mt: 5,
        p: 4,
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: 3,
        backgroundColor: '#fff',
      }}
    >
      <Typography
        variant="h3"
        sx={{ fontWeight: 'bold', textAlign: 'center', mb: 3 }}
      >
        Register
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1">Name</Typography>
        <TextField
          onChange={(e) => setPass(e.target.value)}
          placeholder="Type your name"
          type="text"
          fullWidth
          variant="outlined"
          sx={{ mt: 1 }}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1">Email</Typography>
        <TextField
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value); // Validate email on change
          }}
          placeholder="Type your email"
          type="email"
          fullWidth
          variant="outlined"
          error={emailError} // Show error if email is invalid
          helperText={emailHelperText} // Display error message
          sx={{ mt: 1 }}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1">Password</Typography>
        <TextField
          onChange={(e) => setPass(e.target.value)}
          placeholder="Type your password"
          type="password"
          fullWidth
          variant="outlined"
          sx={{ mt: 1 }}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1">Confirm Password</Typography>
        <TextField
          onChange={(e) => setIsConfirmPass(e.target.value)}
          placeholder="Confirm Password"
          type="password"
          fullWidth
          variant="outlined"
          error={passwordError}
          helperText={passwordHelperText}
          sx={{ mt: 1 }}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mb: 2, borderRadius: '25px', backgroundColor: '#F4F1EA', color: '#000' }}
        onClick={handleRegister}
      >
        Register
      </Button>
      <Typography variant="body2" sx={{ textAlign: 'center', mb: 2 }}>
        Or sign up with
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <IconButton
            sx={{
              backgroundColor: '#DB4437',
              '&:hover': { backgroundColor: '#C13529' },
            }}
          >
            <GoogleIcon sx={{ color: '#fff' }} />
          </IconButton>
        </Grid>
      </Grid>
      <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
        Already have an account? <Link href="/Login">Login</Link>
      </Typography>
    </Container>
  );
};

export default Register;
