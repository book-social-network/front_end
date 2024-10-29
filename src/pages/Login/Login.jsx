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
        Login
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1">Email</Typography>
        <TextField
          placeholder="Type your email"
          type="email"
          fullWidth
          variant="outlined"
          sx={{ mt: 1 }}
          InputProps={{
            startAdornment:(
              <InputAdornment position='start'>
                <PersonIcon/>
              </InputAdornment>
            )
          }}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
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
      <Link href="#" sx={{ display: 'block', mb: 2, textAlign: 'right' }}>
        Forgot password?
      </Link>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          mb: 2,
          borderRadius: '25px',
          backgroundColor: '#F4F1EA',
          color: '#000',
        }}
        onClick={handleLogin}
      >
        Login
      </Button>
      <Typography variant="body2" sx={{ textAlign: 'center', mb: 2 }}>
        Or Sign Up Using
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
        Or <Link href="/Register">Sign up</Link>
      </Typography>
    </Container>
  );
};

export default Login;
