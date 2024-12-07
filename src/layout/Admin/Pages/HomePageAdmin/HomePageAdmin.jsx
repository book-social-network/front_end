import React, { useEffect, useState } from 'react'
import NavbarAdmin from '../../Components/NavbarAdmin/NavbarAdmin'
import ManageAuthor from '../ManageAuthor/ManageAuthor'
import ManageBook from '../ManageBook/ManageBook'
import ManageUser from '../ManageUser/ManageUser'
import ManageGroup from '../ManageGroup/ManageGroup'
import ManageType from '../ManageType/ManageType'
import Dashboard from '../Dashboard/Dashboard'
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
import { useCheckAuth } from '../../../../middleware/useAuth'
import { useUserProfile } from '../../../../hooks/useUserProfile'
import ManagePost from '../ManagePost/ManagePost'
import AuthorizationAxios from '../../../../hooks/Request'

export default function HomePageAdmin() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activePage, setActivePage] = useState('Dashboard')
  const [data, setData] = useState()
  const { user } = useUserProfile()

  useCheckAuth({ requiredRole: 'admin', userRole: user?.user?.role });

  useEffect(() => {
    const fetchData = async () => {
      const res = await AuthorizationAxios.get('/api/view/statistical')
      setData(res.data)
    }
    fetchData()
  }, [user])

  const renderContent = () => {
    switch (activePage) {
      case 'Books':
        return <ManageBook />
      case 'Authors':
        return <ManageAuthor />
      case 'Types of Book':
        return <ManageType />
      case 'Groups':
        return <ManageGroup />
      case 'Users':
        return <ManageUser />
      case 'Posts':
        return <ManagePost />
      default:
        return <Dashboard data={data} />
    }
  }

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item sm={2} sx={{ display: { xs: 'none', sm: 'block' } }}>
          <NavbarAdmin onSelect={setActivePage} />
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
            <Box sx={{ p: 2 }}>{renderContent()}</Box>
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
          <NavbarAdmin onSelect={setActivePage} />
        </Box>
      </Drawer>
    </div>
  )
}
