import React from 'react'
import LeftContainer from '../../layout/User/Components/LeftContainer/LeftContainer'
import CenterContainer from '../../layout/User/Components/CenterContainer/CenterContainer'
import RighContainer from '../../layout/User/Components/RightContainer/RightContainer'
import Footer from '../../layout/User/Components/Footer/Footer'
import Post from '../../layout/User/Poster/Post'
import avatarU from '../../assets/images/MeoAnhLongNgan.webp'
import { Box, Grid } from '@mui/material'
import '../../css/HomePage.css'

const HomePage = () => {

  return (
    <>
      <div>
        <Grid container spacing={3}>
          <Grid className="LeftContainer container" item xs={0} sm={3}>
            <Box mt={2} mb={2}>

            <LeftContainer />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} sx={{paddingRight:'24px'}}>
            <CenterContainer />
            <Post
              userAvatar={avatarU}
              userName="Lê Minh Đức"
              bookImg={avatarU}
              bookTitle="Test Book"
              bookDescription="This is a description of the book."
              bookLink="https://book-link-url.com"
              timeStamp={new Date().toLocaleString()}
            />
          </Grid>
          <Grid className="RightContainer container" item xs={0} sm={3}>
            <RighContainer />
            <Footer classname="sm" />
          </Grid>
        </Grid>
      </div>
    </>
  )
}
export default HomePage
