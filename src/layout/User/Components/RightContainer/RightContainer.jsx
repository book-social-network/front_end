import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import image1 from '../../../../assets/banners/right_banner.jpg';
import '../../../../css/rightContainer.css';

const RightContainer = () => {
  return (
    <Box className="right-content">
      <Typography variant="h6">News & Interviews</Typography>
      <Typography variant="body1">
        <Link href="#" underline="none">
          10 New Books Recommended by Readers This Week
        </Link>
      </Typography>
      <Link href="#">
        <img src={image1} alt="image1" style={{ width: '100%' }} />
      </Link>
    </Box>
  );
};

export default RightContainer;
