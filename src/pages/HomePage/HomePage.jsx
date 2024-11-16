import React, { useEffect, useState } from 'react'
import LeftContainer from '../../layout/User/Components/LeftContainer/LeftContainer'
import CenterContainer from '../../layout/User/Components/CenterContainer/CenterContainer'
import RighContainer from '../../layout/User/Components/RightContainer/RightContainer'
import Footer from '../../layout/User/Components/Footer/Footer'
import Post from '../../layout/User/Poster/Post'
import { Box, Grid } from '@mui/material'
import '../../css/HomePage.css'
import axios from 'axios'
import { useUserProfile } from '../../hooks/useUserProfile'

const HomePage = () => {
  const [allPost, setListPost] = useState([])
  const [post, setPost] = useState([])
  const { token } = useUserProfile()

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}/api/post/get-all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        setListPost(response.data)
        console.log(allPost);

        const postRequests = allPost.map((item) =>
          axios.get(
            `${process.env.REACT_APP_BACKEND}/api/post/get/${item.post.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          ),
        )

        const postsData = await Promise.all(postRequests)
        setPost(postsData.map((res) => res.data))
      } catch (e) {
        console.log(e)
      }
    }

    getPost()
  }, [token])

  const postElements = post.map((postData, index) => (
    <Post
      key={index}
      postId={postData.post.id}
      userId={postData.user[0].id}
      userAvatar={postData.user[0].image_url}
      bookDescription={postData.books[0].name}
      bookImg={postData.books[0].image}
      bookLink={postData.books.link_book}
      bookTitle={postData.books.name}
      timeStamp={postData.post.created_at}
      userName={postData.user[0].name}
      likes={postData.likes.length}
      state_like={postData['state-like']}
    />
  ))

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
