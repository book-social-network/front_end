import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';

export default function ItemAssessment({ idUser, imageUser, description, timeStamp, nameUser }) {
  return (
    <Box 
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
        marginBottom: 2,
        padding: 2,
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
      }}
    >
      {/* User Avatar */}
      <Avatar 
        alt={`Avatar of User ${idUser}`} 
        src={imageUser} 
        sx={{ width: 56, height: 56 }}
      />

      {/* Assessment Details */}
      <Box sx={{ flex: 1 }}>
        {/* Name and Timestamp */}
        <Typography variant="subtitle1" fontWeight="bold">
          {nameUser}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {formatDistanceToNow(new Date(timeStamp), { addSuffix: true })}
        </Typography>

        {/* Description */}
        <Typography variant="body1" sx={{ marginTop: 1 }}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
}
