import React from 'react'
import '../../css/group.css'
import { Box, Container, Grid, Typography } from '@mui/material'
import Footer from '../../layout/User/Components/Footer/Footer'

export default function Group() {
  return (
    <div>
      <Box>
        <Container>
          <Typography className="title" variant="h5">
            Groups
          </Typography>
          <hr />
          <Grid container>
            <Grid item sm={6} xs={12}>
              <Typography variant='p' className='title'>Recomend Groups</Typography>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Typography variant='p' className='title'>My Groups</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </div>
  )
}
