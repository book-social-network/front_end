import React from 'react';
import '../../css/group.css';
import { Box, Container, Typography } from '@mui/material';
import Footer from '../../layout/User/Components/Footer/Footer';

export default function Group() {
  return (
    <div>
      <Box>
        <Container>
          <Typography className="title" variant="h5">
            Groups
          </Typography>
          <hr />
        </Container>
      </Box>
      <Footer />
    </div>
  );
}
