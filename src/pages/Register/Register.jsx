import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  Grid,
  Box,
} from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import { useForm } from 'react-hook-form'
import '../../css/Register.css'
import AuthorizationAxios from '../../hooks/Request'

const Register = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value) || 'Invalid email format'
  }

  const onSubmit = async (data) => {
    if (data.password !== data.password_confirmation) {
      alert('Passwords do not match')
      return
    }

    try {
      await AuthorizationAxios.post('/api/register', data)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container maxWidth="xs" className="register-container">
      <Typography variant="h3" className="register-title">
        Register
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="input-box">
          <Typography variant="body1">Name</Typography>
          <TextField
            {...register('name', { required: 'Name is required' })}
            placeholder="Type your name"
            type="text"
            fullWidth
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{ mt: 1 }}
          />
        </Box>

        <Box className="input-box">
          <Typography variant="body1">Email</Typography>
          <TextField
            {...register('email', {
              required: 'Email is required',
              validate: validateEmail,
            })}
            placeholder="Type your email"
            type="email"
            fullWidth
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ mt: 1 }}
          />
        </Box>

        <Box className="input-box">
          <Typography variant="body1">Password</Typography>
          <TextField
            {...register('password', { required: 'Password is required' })}
            placeholder="Type your password"
            type="password"
            fullWidth
            variant="outlined"
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{ mt: 1 }}
          />
        </Box>

        <Box className="input-box">
          <Typography variant="body1">Confirm Password</Typography>
          <TextField
            {...register('password_confirmation', {
              required: 'Please confirm your password',
            })}
            placeholder="Confirm Password"
            type="password"
            fullWidth
            variant="outlined"
            error={!!errors.password_confirmation}
            helperText={errors.password_confirmation?.message}
            sx={{ mt: 1 }}
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="register-button"
          type="submit"
        >
          Register
        </Button>
      </form>

      <Typography variant="body2" className="sign-up-with-text">
        Or sign up with
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <IconButton
            className="google-button"
            sx={{
              backgroundColor: '#DB4437',
              '&:hover': { backgroundColor: '#C13529' },
            }}
          >
            <GoogleIcon sx={{ color: '#fff' }} />
          </IconButton>
        </Grid>
      </Grid>
      <Typography variant="body2" className="login-link">
        Already have an account? <Link to="/Login">Login</Link>
      </Typography>
    </Container>
  )
}

export default Register
