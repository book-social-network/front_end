import React from 'react';
import { Box, Typography } from '@mui/material';
import '../../css/rightContainer.css';

const RightContainer = () => {
  return (
    <Box className="right-content">
      <Typography variant="h6">Improve Recommendations</Typography>
      <Typography>
        Rating at least 20 books improves your recommendations.
      </Typography>
      <Typography variant="h6">Goodreads Choice Awards</Typography>
      <img src="path_to_goodreads_image" alt="Goodreads Choice Awards" className="award-image" />
    </Box>
  );
};

export default RightContainer;
