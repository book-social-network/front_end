import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Container,
  TextField,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Autocomplete,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import BookSVG from '../../../../assets/images/book-open-svgrepo-com.svg'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import SearchIcon from '@mui/icons-material/Search'
import LinearProgessLabel from '../../../../hooks/LinearProgessLabel'
import '../../../../css/leftContainer.css'
import AuthorizationAxios from '../../../../hooks/Request'
import { useUserProfile } from '../../../../hooks/useUserProfile'

const LeftContainer = () => {
  const [data, setData] = useState()
  const [dataBook, setDataBook] = useState()
  const navigate = useNavigate()
  const { user } = useUserProfile()
  useEffect(() => {
    const fetchData = async () => {
      const res = await AuthorizationAxios.get(
        `/api/assessment/get-assessment-user/${user.user.id}`,
      )
      const resP = await res.data
      setData(resP)
    }
    fetchData()
  }, [])
  useEffect(() => {
    const fetchDataBook = async () => {
      const res = await AuthorizationAxios.get('/api/book/get-all')
      const resB = await res.data
      setDataBook(resB)
    }
    fetchDataBook()
  }, [])
  const wantToReadCount =
    data?.filter((item) => item.assessment.state_read === 0).length || 0
  const readingCount =
    data?.filter((item) => item.assessment.state_read === 1).length || 0
  const readCount =
    data?.filter((item) => item.assessment.state_read === 2).length || 0
  const totalBooks = wantToReadCount + readingCount + readCount
  return (
    <Container sx={{background:'#FDF5E6'}}>
      <Box className="left-content">
        <Typography variant="h6">Currently Reading</Typography>
        <Grid>
          <IconButton>
            <AutoStoriesIcon />
          </IconButton>
          <Typography variant="p">What are you reading today?</Typography>
        </Grid>
        <Box className="search-books">
          <Autocomplete
            options={
              dataBook?.map((book) => ({ id: book.id, title: book.name })) || []
            }
            getOptionLabel={(option) => option.title || ''}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Find book"
                variant="outlined"
                size="small"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {params.InputProps.endAdornment}
                      <InputAdornment position="end">
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    </>
                  ),
                }}
              />
            )}
            onChange={(event, value) => {
              if (value?.id) {
                navigate(`/detail-book/${value.id}`)
              }
            }}
            sx={{ width: '100%' }}
          />
          <hr />
        </Box>

        <Typography variant="h6">2024 Reading Challenge</Typography>
        <Grid container spacing={2}>
          <Grid
            item
            xs={6}
            className="grid-item"
            sx={{ backgroundColor: 'bisque', mt: 3 }}
          >
            <Typography variant="h4" className="small-text">
              2024
            </Typography>
            <img src={BookSVG} alt="Book" />
            <Typography variant="h4" className="small-text">
              READING
            </Typography>
            <Typography variant="h4" className="small-text">
              CHALLENGE
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Box className="challenge-box">
              <Link href="#" underline="none" className="custom-link">
                <Typography variant="h4">{readCount}</Typography>
                <Typography variant="body1">books completed</Typography>
              </Link>
              <LinearProgessLabel full={totalBooks} completed={readCount} />
            </Box>
          </Grid>
        </Grid>
        <hr />
        {wantToReadCount > 0 ? (
          <Grid container spacing={3}>
            {data
              .filter((item) => item.assessment.state_read === 0)
              .map((item) => (
                <Grid item xs={4} key={item.id}>
                  <Link href="#">
                    <img
                      style={{ maxWidth: '100%' }}
                      src={item.book?.[0]?.image || 'fallback_image.jpg'}
                      alt={item.book?.[0]?.title || 'Book'}
                    />
                  </Link>
                </Grid>
              ))}
          </Grid>
        ) : (
          <Typography variant="h6">You don't choose a book to read</Typography>
        )}

        <hr />
        <Typography variant="h6">MY BOOKSHELF </Typography>
        <Grid container>
          <Grid item xs={2}>
            {wantToReadCount}
          </Grid>
          <Grid
            item
            xs={10}
            onClick={() => {
              navigate('/myBooks?type=0')
            }}
          >
            <Typography variant="body2">Want to read</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={2}>
            {readingCount}
          </Grid>
          <Grid
            item
            xs={10}
            onClick={() => {
              navigate('/myBooks?type=1')
            }}
          >
            <Typography variant="body2">Reading</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={2}>
            {readCount}
          </Grid>
          <Grid
            item
            xs={10}
            onClick={() => {
              navigate('/myBooks?type=2')
            }}
          >
            <Typography variant="body2">Read</Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default LeftContainer
