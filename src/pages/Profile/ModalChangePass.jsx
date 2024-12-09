import React, { useState } from 'react'
import {
  Modal,
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { toast } from 'react-toastify'
import AuthorizationAxios from '../../hooks/Request'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
}

export default function ModalChangePass({ open, close }) {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPass, setConfirmNewPassword] = useState('')
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPass: false,
  })

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const handleSubmit = async () => {
    try {
      if (newPassword !== confirmNewPass) {
        toast.warning('New password and confirm password do not match!!!')
        return
      } else if (
        oldPassword === '' ||
        newPassword === '' ||
        confirmNewPass === ''
      ) {
        toast.warning('Please fill in all fields')
        return
      } else if (
        oldPassword.length < 6 ||
        newPassword.length < 6 ||
        confirmNewPass.length < 6
      ) {
        toast.warning('Password must be at least 6 characters')
        return
      } else if (oldPassword === newPassword) {
        toast.warning('New password must not be the same as old password')
        return
      } else {
        const res = await AuthorizationAxios.post('/api/auth/change-pass', {
          old_password: oldPassword,
          new_password: newPassword,
          new_password_confirmation: confirmNewPass,
        })
        toast.success('Password changed successfully')
        close()
      }
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message ||
          error.response.data.error ||
          'An error occurred while changing password'
        toast.error(errorMessage)
      } else if (error.request) {
        toast.error(
          'No response received from server. Please check your connection.',
        )
      } else {
        toast.error('Error: ' + error.message)
      }
    }
  }

  return (
    <Modal open={open} onClose={close}>
      <Box sx={modalStyle}>
        <Typography variant="h6" mb={2}>
          Change Password
        </Typography>
        <TextField
          label="Old Password"
          type={showPassword.oldPassword ? 'text' : 'password'}
          fullWidth
          required
          margin="normal"
          onChange={(e) => setOldPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => togglePasswordVisibility('oldPassword')}
                >
                  {showPassword.oldPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="New Password"
          type={showPassword.newPassword ? 'text' : 'password'}
          fullWidth
          required
          margin="normal"
          onChange={(e) => setNewPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => togglePasswordVisibility('newPassword')}
                >
                  {showPassword.newPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Confirm New Password"
          type={showPassword.confirmNewPass ? 'text' : 'password'}
          fullWidth
          required
          margin="normal"
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => togglePasswordVisibility('confirmNewPass')}
                >
                  {showPassword.confirmNewPass ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button variant="outlined" color="secondary" onClick={close}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
