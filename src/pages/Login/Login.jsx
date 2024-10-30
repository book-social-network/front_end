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
  InputAdornment,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import PersonIcon from '@mui/icons-material/Person';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import '../../css/Login.css';

const Login = () => {
  const [pass, setPass] = useState('');
  const [isShowPass, setIsShowPass] = useState(true);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState('');

  const handleLogin = () => {
    if (pass !== '12345678') {
      setPasswordError(true);
      setPasswordHelperText('Wrong password');
    } else {
      setPasswordError(false);
      setPasswordHelperText('');
      console.log('Login successful');
    }
  };

  return (
    <Container maxWidth="xs" className="login-container">
      <Typography variant="h3" className="login-title">
        Login
      </Typography>
      <Box className="input-box">
        <Typography variant="body1">Email</Typography>
        <TextField
          placeholder="Type your email"
          type="email"
          fullWidth
          variant="outlined"
          sx={{ mt: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box className="input-box">
        <Typography variant="body1">Password</Typography>
        <TextField
          onChange={(e) => setPass(e.target.value)}
          placeholder="Type your password"
          type={isShowPass ? 'text' : 'password'}
          fullWidth
          variant="outlined"
          error={passwordError}
          helperText={passwordHelperText}
          sx={{ mt: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={() => setIsShowPass(!isShowPass)}>
                  {isShowPass ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Link href="#" className="forgot-password-link">
        Forgot password?
      </Link>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        className="login-button"
        onClick={handleLogin}
      >
        Login
      </Button>
      <Typography variant="body2" className="signup-using-text">
        Or Sign Up Using
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <IconButton className="google-button" sx={{backgroundColor:'#DB4437', '&:hover': { backgroundColor: '#C13529'}}}>
            <GoogleIcon sx={{ color: '#fff' }} />
          </IconButton>
        </Grid>
      </Grid>
      <Typography variant="body2" className="signup-link">
        Or <Link href="/Register">Sign up</Link>
      </Typography>
    </Container>
  );
};

export default Login;
