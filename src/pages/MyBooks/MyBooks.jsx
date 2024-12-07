import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Typography,
  IconButton,
  Grid,
  Box,
  Container,
  List,
  ListItem,
  TableRow,
  TableCell,
  Table,
  Paper,
  TableHead,
  TableBody,
  TableContainer,
  Button,
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import '../../css/MyBooks.css'
import Image from '../../assets/images/MeoAnhLongNgan.webp'
import Footer from '../../layout/User/Components/Footer/Footer'
import { useUserProfile } from '../../hooks/useUserProfile'
import AuthorizationAxios from '../../hooks/Request'

const MyBooks = () => {
  const [books, setBooks] = useState([])
  const [ratings, setRatings] = useState([])
  const [filter, setFilter] = useState('all')
  const { user } = useUserProfile()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const searchFilter = searchParams.get('filter')
    if (searchFilter) {
      setFilter(searchFilter)
    }
  }, [location.search])

  useEffect(() => {
    const fetchBooks = async () => {
      let appliedFilter = filter

      if (user) {
        try {
          const response = await AuthorizationAxios.get(
            `/api/assessment/get-assessment-user/${user.user.id}`,
          )
          const fetchedBooks = response.data
          const filteredBooks =
            appliedFilter === 'all'
              ? fetchedBooks
              : fetchedBooks.filter(
                  (item) =>
                    item.assessment.state_read ===
                    (appliedFilter === 'wantToRead'
                      ? 0
                      : appliedFilter === 'Reading'
                        ? 1
                        : 2),
                )
          setBooks(filteredBooks)
          setRatings(Array(filteredBooks.length).fill(0))
        } catch (e) {
          console.log(e)
        }
      }
    }
    fetchBooks()
  }, [user, filter])
  // const handleDetail = (id) => {
  //   navigate(`/detail-book/${id}`)
  // }

  const getStatusText = (stateRead) => {
    switch (stateRead) {
      case 0:
        return 'Want to read'
      case 1:
        return 'Reading'
      case 2:
        return 'Read'
      default:
        return 'Unknown'
    }
  }

  const handleRatingChange = async (rowIndex, rating) => {
    const updatedRating = rating === ratings[rowIndex] ? 0 : rating
    setRatings((prevRatings) => {
      const newRatings = [...prevRatings]
      newRatings[rowIndex] = updatedRating
      return newRatings
    })

    const book = books[rowIndex]
    const assessmentId = book.assessment.id
    try {
      await AuthorizationAxios.post(`/api/assessment/update/${assessmentId}`, {
        star: updatedRating,
      })
    } catch (error) {
      console.error('Error updating rating:', error)
    }
  }

  const renderStars = (starRating, rowIndex) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <IconButton
          key={i}
          onClick={() => handleRatingChange(rowIndex, i)}
          style={{ padding: 0 }}
        >
          {i <= starRating ? (
            <StarIcon style={{ color: 'gold' }} />
          ) : (
            <StarBorderIcon style={{ color: 'gray' }} />
          )}
        </IconButton>,
      )
    }
    return stars
  }

  return (
    <div>
      <Box>
        <Container>
          <Typography variant="h5" className="title">
            My Books
          </Typography>
          <hr />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <List component="ul" disablePadding>
                <ListItem component="li">
                  <Button
                    variant={filter === 'all' ? 'contained' : 'text'}
                    color={filter === 'all' ? 'primary' : 'default'}
                    onClick={() => setFilter('all')}
                    fullWidth
                    sx={{
                      color: filter === 'all' ? '#ffffff' : '#00635d',
                      fontWeight: filter === 'all' ? 'bold' : 'normal',
                    }}
                  >
                    All
                  </Button>
                </ListItem>
                <ListItem component="li">
                  <Button
                    variant={filter === 'wantToRead' ? 'contained' : 'text'}
                    color={filter === 'wantToRead' ? 'primary' : 'default'}
                    onClick={() => setFilter('wantToRead')}
                    fullWidth
                    sx={{
                      color: filter === 'wantToRead' ? '#ffffff' : '#00635d',
                      fontWeight: filter === 'wantToRead' ? 'bold' : 'normal',
                    }}
                  >
                    Want to read
                  </Button>
                </ListItem>
                <ListItem component="li">
                  <Button
                    variant={filter === 'Reading' ? 'contained' : 'text'}
                    color={filter === 'Reading' ? 'primary' : 'default'}
                    onClick={() => setFilter('Reading')}
                    fullWidth
                    sx={{
                      color: filter === 'Reading' ? '#ffffff' : '#00635d',
                      fontWeight: filter === 'Reading' ? 'bold' : 'normal',
                    }}
                  >
                    Reading
                  </Button>
                </ListItem>
                <ListItem component="li">
                  <Button
                    variant={filter === 'Read' ? 'contained' : 'text'}
                    color={filter === 'Read' ? 'primary' : 'default'}
                    onClick={() => setFilter('Read')}
                    fullWidth
                    sx={{
                      color: filter === 'Read' ? '#ffffff' : '#00635d',
                      fontWeight: filter === 'Read' ? 'bold' : 'normal',
                    }}
                  >
                    Read
                  </Button>
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={12} sm={9}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Cover</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Author</TableCell>
                      <TableCell>Rating</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {books.map((item, rowIndex) => (
                      <TableRow
                        key={rowIndex}
                      >
                        <TableCell>
                          <img
                            src={item.book[0].image || Image}
                            alt="Cover"
                            style={{ width: 50, height: 50 }}
                          />
                        </TableCell>
                        <TableCell>{item.book[0].name}</TableCell>
                        <TableCell>
                          {item.authors[0].name || 'Unknown'}
                        </TableCell>
                        <TableCell>
                          {getStatusText(item.assessment.state_read) ===
                          'Want to read' ? (
                            <></>
                          ) : (
                            renderStars(
                              ratings[rowIndex] || item.assessment.star,
                              rowIndex,
                            )
                          )}
                        </TableCell>
                        <TableCell>
                          <p>{getStatusText(item.assessment.state_read)}</p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </div>
  )
}

export default MyBooks
