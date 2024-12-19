import React, { useState } from 'react';
import {
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import GroupList from './GroupList';

export default function ManageGroup() {
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
const [state, setState] = useState('all');

  const handleStateChange = (event, newState) => {
    if (newState !== null) {
      setState(newState);
    }
  };
  return (
    <div>
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
          <ToggleButton value="all">All Group</ToggleButton>
          <ToggleButton value="new">New Group</ToggleButton>
        </ToggleButtonGroup>
        {state === 'all' && <GroupList path="/api/group/get-all" />}
        {state === 'new' && <GroupList path="/api/group/get-all-group-new" />}
      </div>
    </ThemeProvider>
    </div>
  )
}
