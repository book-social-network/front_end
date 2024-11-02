import React from 'react'
import LeftContainer from '../../layout/User/Components/LeftContainer/LeftContainer'
import CenterContainer from '../../layout/User/Components/CenterContainer/CenterContainer'
import RighContainer from '../../layout/User/Components/RightContainer/RightContainer'
import Footer from '../../layout/User/Components/Footer/Footer'
import Post from '../../layout/User/Poster/Post'
import avatarU from '../../assets/images/MeoAnhLongNgan.webp'
import { Grid } from '@mui/material'
import '../../css/HomePage.css'
import { useUserContext } from '../../hooks/UseContext'
import Header from '../../layout/User/Components/Header/Header'

const HomePage = () => {
  const { token } = useUserContext()

  return (
    <>
      <div>
        <Grid container spacing={3}>
          <Grid className="LeftContainer" item xs={0} sm={3}>
            <LeftContainer />
          </Grid>
          <Grid item xs={12} sm={6}>
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
          <Grid className="RightContainer" item xs={0} sm={3}>
            <RighContainer />
            <Footer classname="sm" />
          </Grid>
        </Grid>
      </div>
    </>
  )
}
export default HomePage
