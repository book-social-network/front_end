import React, { useState, useEffect, useCallback } from 'react'
import { Box, Card, Typography, Grid, TextField, Button } from '@mui/material'
import HeadType from './HeadType.jsx'
import AuthorizationAxios from '../../hooks/Request.jsx'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function UploadType() {
  const [types, setTypes] = useState([])
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  let debounceTimeout

  useEffect(() => {
    const fetchType = async () => {
      try {
        const response = await AuthorizationAxios.get('/api/type/get-all')
        setTypes(response.data)
      } catch (error) {
        console.error('Error fetching types:', error)
      }
    }
    fetchType()
  }, [])

  const checkDuplicateType = useCallback(() => {
    const typeExists = types.some(
      (type) => type.name.toLowerCase() === name.toLowerCase(),
    )
    if (typeExists) {
      setError('Type đã tồn tại.')
    } else {
      setError('')
    }
  }, [name, types])

  const handleKeyUp = () => {
    clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(() => {
      if (name.trim()) checkDuplicateType()
    }, 1000)
  }

  const handleSubmit = async () => {
    if (error) {
      toast.error(error)
      return
    }

    try {
      await AuthorizationAxios.post('/api/type/insert', { name })
      toast.success('Upload type success')
      setName('')
      setError('')
    } catch (err) {
      toast.error('Error uploading type')
    }
  }

  return (
    <Box padding={1}>
      <HeadType types={types} />
      <Box
        paddingTop={1}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box>
          <Card
            sx={{
              maxWidth: 400,
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
              Add new Type
            </Typography>

            <Grid container spacing={3} sx={{ maxWidth: 420 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name Type"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyUp={handleKeyUp}
                  error={!!error}
                  helperText={error}
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
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#000',
                    color: '#fff',
                    ':hover': { bgcolor: '#0056b3' },
                    fontWeight: 'bold',
                    padding: '12px 0',
                    width: '100%',
                  }}
                  onClick={handleSubmit}
                >
                  Save Type
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Box>
    </Box>
  )
}
