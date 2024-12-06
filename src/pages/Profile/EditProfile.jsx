import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Avatar,
  Button,
  Card,
  TextField,
  Grid,
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useUserProfile } from '../../hooks/useUserProfile'
import ModalEditAvatar from './ModalEditAvatar'
import Footer from '../../layout/User/Components/Footer/Footer'
import AuthorizationAxios from '../../hooks/Request'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'

function EditProfile() {
  const { user } = useUserProfile()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [dob, setDob] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (user?.user) {
      setName(user.user.name || '')
      setPhone(user.user.phone || '')
      setDob(user.user.dob ? dayjs(user.user.dob) : null)
    }
  }, [user])
  const handleSubmit = async () => {
    try {
      await AuthorizationAxios.post('/api/user/update', {
        name: name,
        phone: phone,
        dob: dob?.format('YYYY-MM-DD'),
      })
      toast.success('Update successfully')
    } catch (error) {
      console.error('Error in update: ', error)
      toast.warning('Error in update')
    }
  }

  return (
    <>
      <Box
        sx={{
          paddingTop: '10px',
          bgcolor: '#f5f5f5',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          color: '#000',
          minHeight: '100vh',
        }}
      >
        <Card
          sx={{
            width: 400,
            bgcolor: '#fff',
            p: 4,
            borderRadius: '12px',
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexGrow: 1,
            marginBottom: '20px',
          }}
        >
          <Typography
            variant="h5"
            sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}
          >
            Chỉnh sửa trang cá nhân
          </Typography>

          <Card
            sx={{
              width: '100%',
              bgcolor: '#f1f1f1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2,
              mb: 3,
              borderRadius: '10px',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                src={user?.user.image_url}
                alt="User Avatar"
                sx={{ width: 60, height: 60, mr: 2 }}
              />
              <Typography variant="body2" color="#555" fontWeight="bold">
                {user?.user.email}
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="small"
              sx={{
                bgcolor: '#000',
                textTransform: 'none',
                boxShadow: 'none',
                ':hover': { bgcolor: '#0056b3' },
              }}
              onClick={handleOpenModal}
            >
              Đổi ảnh
            </Button>
          </Card>

          <Grid container spacing={3} sx={{ maxWidth: 420 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{
                  bgcolor: '#fff',
                  '& .MuiInputLabel-root': {
                    color: '#000',
                    fontWeight: 'bold',
                  },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '&:hover fieldset': { borderColor: '#000' },
                    '&.Mui-focused fieldset': { borderColor: '#000' },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={user?.user.email || ''}
                InputProps={{ readOnly: true }}
                sx={{
                  bgcolor: '#f9f9f9',
                  '& .MuiInputLabel-root': {
                    color: '#000',
                    fontWeight: 'bold',
                  },
                  '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Số điện thoại"
                variant="outlined"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={{
                  bgcolor: '#fff',
                  '& .MuiInputLabel-root': {
                    color: '#000',
                    fontWeight: 'bold',
                  },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '&:hover fieldset': { borderColor: '#000' },
                    '&.Mui-focused fieldset': { borderColor: '#000' },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="date of birth"
                  value={dob}
                  onChange={(newValue) => setDob(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      sx={{
                        bgcolor: '#fff',
                        '& .MuiInputLabel-root': {
                          color: '#000',
                          fontWeight: 'bold',
                        },
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          '&:hover fieldset': { borderColor: '#000' },
                          '&.Mui-focused fieldset': { borderColor: '#000' },
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: '#000',
                  ':hover': { bgcolor: '#0056b3' },
                  fontWeight: 'bold',
                  padding: '12px 0',
                }}
                onClick={handleSubmit}
              >
                Lưu thay đổi
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Box>
      <ModalEditAvatar open={isModalOpen} onClose={handleCloseModal} userId={user?.user.id} />
      <Footer />
    </>
  )
}

export default EditProfile
