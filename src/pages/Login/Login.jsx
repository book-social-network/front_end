import React, { useState } from 'react'
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
} from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import PersonIcon from '@mui/icons-material/Person'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import '../../css/Login.css'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../hooks/UseContext'
import AuthorizationAxios from '../../hooks/Request'
import { toast } from 'react-toastify'

const Login = () => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [isShowPass, setIsShowPass] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [passwordHelperText, setPasswordHelperText] = useState('')
  const navigate = useNavigate()
  const { setToken } = useUserContext()

  const handleLogin = async () => {
    try {
      if (!email || !pass) {
        setPasswordHelperText('You must enter all fields')
        setPasswordError(true)
        return
      }
      const res = await AuthorizationAxios.post('/api/login', {
        email: email,
        password: pass,
      })

      
      if (res?.status === 401) {
        toast.error('Invalid email or password')
        setPasswordHelperText('Invalid email or password')
        setPasswordError(true)
        return
      }

      if (res?.data.access_token) {
        const access_token = res.data.access_token
        const userRole = res.data.user?.role

        localStorage.setItem('access_token', access_token)
        setToken(access_token)

        if (userRole === 'admin') {
          navigate('/admin')
        } else {
          navigate('/home')
        }
      } else {
        setPasswordHelperText('Invalid email or password')
        setPasswordError(true)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message);
      setPasswordHelperText('Error!!!')
      setPasswordError(true)
    }
  }

  return (
    <Container maxWidth="xs" className="login-container">
      <Typography variant="h3" className="login-title">
        Login
      </Typography>
      <Box className="input-box">
        <Typography variant="body1">Email</Typography>
        <TextField
          onChange={(e) => setEmail(e.target.value)}
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
      <Typography variant="body2" className="signup-link">
        Or <Link href="/register">Sign up</Link>
      </Typography>
    </Container>
  )
}

export default Login
