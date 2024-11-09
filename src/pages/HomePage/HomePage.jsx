import React, { useEffect, useState } from 'react'
import LeftContainer from '../../layout/User/Components/LeftContainer/LeftContainer'
import CenterContainer from '../../layout/User/Components/CenterContainer/CenterContainer'
import RighContainer from '../../layout/User/Components/RightContainer/RightContainer'
import Footer from '../../layout/User/Components/Footer/Footer'
import Post from '../../layout/User/Poster/Post'
import avatarU from '../../assets/images/MeoAnhLongNgan.webp'
import { Box, Grid } from '@mui/material'
import '../../css/HomePage.css'
import axios from 'axios'

const HomePage = () => {
  const [allPost, setListPost] = useState([])
  const [post, setPost] = useState([])

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}/api/post/get-all`
        )
        setListPost(response.data)
        const postRequests = response.data.map((item) =>
          axios.get(
            `${process.env.REACT_APP_BACKEND}/api/post/get/${item.post.id}`
          )
        )
        const postsData = await Promise.all(postRequests)
        setPost(postsData.map((res) => res.data))
      } catch (e) {
        console.log(e)
      }
    }

    getPost()
  }, [])
  const postElements = []
  for (let i = 0; i < post.length; i++) {
    postElements.push(
      <Post
        key={i}
        userAvatar={post[i].user[0].image_url}
        bookDescription={post[i].books[0].name}
        bookImg={post[i].books[0].image}
        bookLink={post[i].books.link_book}
        bookTitle={post[i].books.name}
        timeStamp="2024-10-30 20:22:44"
        userName={post[i].user[0].name}
      />
    )
  }
  return (
    <div>
      <Grid container spacing={3}>
        <Grid className="LeftContainer container" item xs={0} sm={3}>
          <Box mt={2} mb={2}>
            <LeftContainer />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ paddingRight: '24px' }}>
          <CenterContainer />
          {postElements}
                 </Grid>
        <Grid className="RightContainer container" item xs={0} sm={3}>
          <RighContainer />
          <Footer classname="sm" />
        </Grid>
      </Grid>
    </div>
  )
}

export default HomePage
