// CenterContent.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import '../../css/centerContainer.css';

const CenterContainer = () => {
  return (
    <Box className="center-content">
      <Typography variant="h4" className="banner-title">
        Celebrate Hispanic Heritage Month
      </Typography>
      <Typography>
        Discover great new books to read this month and all year long!
      </Typography>
      <Box className="news-section">
        <Typography variant="h6">News & Interviews</Typography>
        <Box className="news-items">
          <img src="path_to_news_image1" alt="News 1" />
          <img src="path_to_news_image2" alt="News 2" />
        </Box>
      </Box>
    </Box>
  );
};

export default CenterContainer;
