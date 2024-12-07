import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Box,
} from '@mui/material'
import AuthorizationAxios from '../../hooks/Request'
import { toast } from 'react-toastify'

export default function SuggestFriendsItem({ id, name, image }) {
  const handleFollow = async () => {
    try {
      await AuthorizationAxios.get(`/api/follow/follow/${id}`)
      toast.success(`Followed user with ID: ${name}`)
    } catch (error) {
      console.error('Error following user:', error)
    }
  }

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 2,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
        backgroundColor:'#E0FFFF'
      }}
    >
      <Box
        sx={{
          maxWidth: 80,
          maxHeight: 80,
          borderRadius: '50%',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 2,
        }}
      >
        <img
          src={image}
          alt={name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          {name}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleFollow}
        >
          Theo dõi
        </Button>
      </CardContent>
    </Card>
  )
}
