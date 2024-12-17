import React, { useState } from 'react'
import {
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  ThemeProvider,
  createTheme,
} from '@mui/material'

import UserList from './UserList'

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
export default function ManageUser() {
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
          Manage User
        </Typography>
        <hr />
        <ToggleButtonGroup
          value={state}
          exclusive
          onChange={handleStateChange}
          sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}
        >
          <ToggleButton value="all">All Users</ToggleButton>
          <ToggleButton value="new">New Users</ToggleButton>
        </ToggleButtonGroup>
        {state === 'all' ? (
          <UserList path="/api/user/get-all" />
        ) : (
          <UserList path="/api/user/get-all-user-new" />
        )}
      </div>
    </ThemeProvider>
  )
}
