import React, { useState } from 'react'
import {
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  ThemeProvider,
  createTheme,
} from '@mui/material'

import PostList from './PostList'

const theme = createTheme({
  components: {
    MuiToggleButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: 'white',
            backgroundColor: '#00635d',
            '&:hover': {
              backgroundColor: '#00635d',
            },
          },
        },
      },
    },
  },
})

export default function ManagePosts() {
  const [state, setState] = useState('all')

  const handleStateChange = (event, newState) => {
    if (newState !== null) {
      setState(newState)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Typography
          variant="h4"
          color="#00635d"
          fontWeight="bold"
          align="center"
          sx={{ mt: 3 }}
        >
          Manage Posts
        </Typography>
        <hr />
        <ToggleButtonGroup
          value={state}
          exclusive
          onChange={handleStateChange}
          sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}
        >
          <ToggleButton value="all">All Posts</ToggleButton>
          <ToggleButton value="new">New Posts</ToggleButton>
        </ToggleButtonGroup>
        {state === 'all' ? (
          <PostList path="/api/post/get-all" />
        ) : (
          <PostList path="/api/post/get-all-post-new" />
        )}
      </div>
    </ThemeProvider>
  )
}
