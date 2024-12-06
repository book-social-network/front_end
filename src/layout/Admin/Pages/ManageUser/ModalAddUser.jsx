import React, { useState } from 'react'
import {
  Card,
  Modal,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material'
import AuthorizationAxios from '../../../../hooks/Request'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ModalAddUser({ openModal, closeModal }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value) || 'Invalid email format'
  }

  const handleSubmit = async () => {
    if (
      name === '' ||
      password === '' ||
      confirmPassword === '' ||
      email === ''
    ) {
      toast.error('Please fill all fields')
      return
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    const requestData = {
      name: name,
      password: password,
      email: email,
      password_confirmation: confirmPassword,
    }

    try {
      const response = await AuthorizationAxios.post(
        '/api/register',
        requestData,
      )

      if (response.data && response.data.error) {
        toast.error(response.data.error)
      } else {
        toast.success('User created successfully')
        closeModal()
      }
    } catch (error) {
      console.error('Error creating user:', error)

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Error creating user')
      }
    }
  }

  return (
    <div>
      <Modal open={openModal} onClose={closeModal}>
        <Card
          style={{
            padding: '20px',
            maxWidth: 500,
            margin: 'auto',
            marginTop: '20px',
          }}
        >
          <Typography variant="h6" style={{ marginBottom: '20px' }}>
            Add New User
          </Typography>

          <Grid container spacing={2}>
            <Grid item sm={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                error={!!validateEmail(email) && email !== ''}
                helperText={
                  validateEmail(email) && email !== ''
                    ? validateEmail(email)
                    : ''
                }
              />
            </Grid>

            <Grid item sm={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
              />
            </Grid>

            <Grid item sm={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
              />
            </Grid>

            <Grid item sm={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                variant="outlined"
              />
            </Grid>

            <Grid item sm={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Add User
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Modal>
    </div>
  )
}
