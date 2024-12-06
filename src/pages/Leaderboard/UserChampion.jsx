import React from 'react'
import { Card, Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { TbCircleNumber1Filled } from 'react-icons/tb'

export default function UserChampion({ id, name, point, image }) {
  const navigate = useNavigate()

  const handleClickUser = () => {
    navigate(`/detail-user/${id}`)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2,
      }}
    >
      <Card
        sx={{
          bgcolor: '#FFD700',
          color: '#fff',
          borderRadius: '15px',
          height: 320,
          width: 280,
          textAlign: 'center',
          boxShadow: '0 4px 15px rgba(255, 223, 0, 0.7)',
          position: 'relative',
          padding: 3,
          transition: 'transform 0.3s, box-shadow 0.3s',
          cursor: 'pointer',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 8px 20px rgba(255, 223, 0, 1)',
          },
        }}
        onClick={handleClickUser}
      >
        <TbCircleNumber1Filled
          style={{
            fontSize: '3rem',
            color: '#fff',
            position: 'absolute',
            top: 15,
            left: 15,
          }}
        />
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            overflow: 'hidden',
            margin: '0 auto',
            border: '4px solid #fff',
          }}
        >
          <img
            src={image}
            alt={id}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
        <Typography
          variant="h6"
          sx={{
            marginTop: 3,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: '#333',
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginTop: 1,
            fontSize: '1rem',
            letterSpacing: '0.5px',
            color: '#333',
          }}
        >
          Points: {point}
        </Typography>
      </Card>
    </Box>
  )
}
