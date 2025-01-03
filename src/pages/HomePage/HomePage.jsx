import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../hooks/UseContext'
import LeftContainer from '../../layout/User/Components/LeftContainer/LeftContainer'
import CenterContainer from '../../layout/User/Components/CenterContainer/CenterContainer'
import RightContainer from '../../layout/User/Components/RightContainer/RightContainer'
import Footer from '../../layout/User/Components/Footer/Footer'
import Post from '../../layout/User/Poster/Post'
import { Box, Grid } from '@mui/material'
import '../../css/HomePage.css'
import MyGroupItem from '../../hooks/MyGroupItem'
import AuthorizationAxios from '../../hooks/Request'

const HomePage = () => {
  const { token } = useUserContext()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) return

    const getPosts = async () => {
      setLoading(true)
      try {
        const response = await AuthorizationAxios.get('/api/post/get-all')
        setPosts(response.data)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    getPosts()
  }, [token])

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Grid container spacing={3}>
          <Grid
            className="LeftContainer container"
            item
            xs={0}
            sm={3}
            sx={{ background: '#FDF5E6' }}
          >
            <Box mt={2} mb={2}>
              <LeftContainer />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ paddingRight: '24px', background: '#ffd1dc5e' }}
          >
            <CenterContainer />
            {posts.map((item, index) => {
              if (!item.group && item.share === null) {
                return (
                  <Post
                    key={index}
                    postId={item.post.id}
                    userId={item.user.id}
                    userAvatar={item.user.image_url}
                    bookDescription={item.post.description}
                    bookImg={item.books[0].image}
                    bookLink={item.books[0].link_book}
                    bookTitle={item.books[0].name}
                    likes={item.likes.length}
                    state_like={item['state-like']}
                    timeStamp={item.post.created_at}
                    userName={item.user.name}
                    isDetailPostPage={false}
                    bookId={item.books[0].id}
                  />
                )
              } else {
                if (item.share === null)
                  return (
                    <MyGroupItem
                      key={index}
                      book_link={item.books[0].link_book}
                      group_avatar={item.group.image_group}
                      group_description={item.group.description}
                      group_id={item.group.id}
                      group_name={item.group.name}
                      image_book={item.books[0].image}
                      name_book={item.books[0].name}
                      user_id={item.user.id}
                      post_id={item.post.id}
                      likes={item.likes.length}
                      state_like={item['state-like']}
                      user_avatar={item.user.image_url}
                      user_name={item.user.name}
                      timeStamp={item.post.created_at}
                      book_id={item.books[0].id}
                    />
                  )
              }
            })}
          </Grid>
          <Grid
            className="RightContainer container"
            item
            xs={0}
            sm={3}
            sx={{ background: '#FDF5E6' }}
          >
            <RightContainer />
            <Footer size="sm" />
          </Grid>
        </Grid>
      )}
    </div>
  )
}

export default HomePage
