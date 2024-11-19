import React from 'react'
import { usePostContext } from '../../hooks/UseContext'
import LeftContainer from '../../layout/User/Components/LeftContainer/LeftContainer'
import CenterContainer from '../../layout/User/Components/CenterContainer/CenterContainer'
import RightContainer from '../../layout/User/Components/RightContainer/RightContainer'
import Footer from '../../layout/User/Components/Footer/Footer'
import Post from '../../layout/User/Poster/Post'
import { Box, Grid } from '@mui/material'
import '../../css/HomePage.css'

const HomePage = () => {
  const { posts, addNewPost, loading } = usePostContext()  

  const handleNewPost = (newPost) => {
    addNewPost(newPost)  
  }

  const postElements = posts.map((postData, index) => (
    <Post
      key={index}
      postId={postData.post.id}
      userId={postData.user[0].id}
      userAvatar={postData.user[0].image_url}
      bookDescription={postData.post.description}
      bookImg={postData.books[0].image}
      bookLink={postData.books.link_book}
      bookTitle={postData.books[0].name}
      timeStamp={postData.post.created_at}
      userName={postData.user[0].name}
      likes={postData.likes.length}
      state_like={postData['state-like']}
    />
  ))

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Grid container spacing={3}>
          <Grid className="LeftContainer container" item xs={0} sm={3}>
            <Box mt={2} mb={2}>
              <LeftContainer />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ paddingRight: '24px' }}>
            <CenterContainer onNewPost={handleNewPost} />
            {postElements}
          </Grid>
          <Grid className="RightContainer container" item xs={0} sm={3}>
            <RightContainer />
            <Footer classname="sm" />
          </Grid>
        </Grid>
      )}
    </div>
  )
}

export default HomePage
