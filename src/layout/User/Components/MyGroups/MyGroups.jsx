import React from 'react'
import MyGroupItem from '../../../../hooks/MyGroupItem'
import { Grid } from '@mui/material'

export default function MyGroups({ groups }) {
  const joinedGroups = groups
  return (
    <>
      {joinedGroups.map((group, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <MyGroupItem
            user_id={group.post.user_id}
            post_id={group.post.id}
            user_avatar={group.user.image_url}
            user_name={group.user.name}
            group_name={group.group.name}
            group_description={group.post.description}
            group_avatar={group.group.image_group}
            name_book={group.books.name}
            image_book={group.books[0].image}
            group_id={group.group.id}
            likes={group.likes.length}
            state_like={group['state-like']}
          />
        </Grid>
      ))}
    </>
  )
}
