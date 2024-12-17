import React from 'react'
import Post from '../../layout/User/Poster/Post'
import { useUserProfile } from '../../hooks/useUserProfile'
import { Typography } from '@mui/material'

function MyPost({ post }) {
  const { user } = useUserProfile()

  return (
    <>
      {post.length <= 0 ? (
        <>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Please upload a post
          </Typography>
        </>
      ) : (
        post.map((item, index) => (
          console.log(item),
          <Post
            key={index}
            userName={user?.user.name}
            userId={user?.user.id}
            userAvatar={user?.user.image_url}
            timeStamp={item?.post.created_at}
            postId={item?.post.id}
            bookDescription={item?.books[0].name}
            bookImg={item.books[0].image}
            bookLink={item?.books[0].link_book}
            bookTitle={item?.books[0].name}
            likes={item?.likes.length}
            state_like={item['state-like']}
          />
        ))
      )}
    </>
  )
}
export default MyPost
