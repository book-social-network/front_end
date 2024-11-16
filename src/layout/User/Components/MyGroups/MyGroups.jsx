import React from 'react'
import MyGroupItem from '../../../../hooks/MyGroupItem'
import { Grid } from '@mui/material'

export default function MyGroups({ groups }) {
    const joinedGroups = groups
  return (
    <>
      {joinedGroups.map((group, index) => (
        <Grid item key={index} xs={4}>
          <MyGroupItem
            user_id={group.post.user_id}
            post_id={group.post.id}
            group_name={group.group.name}
            group_description={group.post.description}
          />
        </Grid>
      ))}
    </>
  )
}
