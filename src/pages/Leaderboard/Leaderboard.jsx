import React, { useEffect, useState } from 'react'
import {
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import UserChampion from './UserChampion'
import UserSecond from './UserSecond'
import UserThird from './UserThird'
import Footer from '../../layout/User/Components/Footer/Footer'
import AuthorizationAxios from '../../hooks/Request'

export default function Leaderboard() {
  const [userRank, setUserRank] = useState([])

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AuthorizationAxios.get('/api/profession/get-points')
        const resData = await res.data
        setUserRank(resData)
      } catch (error) {
        console.error('Error fetching leaderboard data:', error)
      }
    }
    fetchData()
  }, [])

  if (userRank.length === 0) {
    return <Typography>Loading...</Typography>
  }

  const [first, second, third, ...others] = userRank
  const top10 = userRank.slice(0, 10)
  const top10Others = others.slice(0, 7)

  return (
    <>
      <Container>
        {!isSmallScreen && (
          <Grid
            container
            spacing={0}
            paddingTop={2}
            display="flex"
            justifyContent="center"
            alignItems="flex-end"
          >
            <Grid item md={4} xs={12}>
              {second && (
                <UserSecond
                  id={second.id}
                  image={second.image_url}
                  name={second.name}
                  point={second.point}
                />
              )}
            </Grid>
            <Grid item md={4} xs={12}>
              {first && (
                <UserChampion
                  id={first.id}
                  image={first.image_url}
                  name={first.name}
                  point={first.point}
                />
              )}
            </Grid>
            <Grid item md={4} xs={12}>
              {third && (
                <UserThird
                  id={third.id}
                  image={third.image_url}
                  name={third.name}
                  point={third.point}
                />
              )}
            </Grid>
          </Grid>
        )}
        <Table sx={{ marginTop: 4 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography fontWeight="bold">Rank</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Name</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Points</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isSmallScreen
              ? top10Others.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell>{index + 4}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.point}</TableCell>
                  </TableRow>
                ))
              : top10.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.point}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </Container>
      <Footer />
    </>
  )
}
