import React, { useState } from 'react'
import NavbarAdmin from '../../Components/NavbarAdmin/NavbarAdmin'
import {
  AppBar,
  Box,
  Grid,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import useAuth from '../../../../middleware/useAuth'
import { useUserProfile } from '../../../../hooks/useUserProfile'

export default function HomePageAdmin({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { user } = useUserProfile()

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item sm={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
          <NavbarAdmin />
        </Grid>

        <Grid item xs={12} sm={10}>
          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Admin Panel
                </Typography>
              </Toolbar>
            </AppBar>
          </Box>

          <Box>
            <Typography variant="h4" component="div" sx={{ p: 2 }}>
              {children}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <NavbarAdmin />
        </Box>
      </Drawer>
    </div>
  )
}
