import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import '../../css/MyBooks.css';
import Image from '../../assets/images/MeoAnhLongNgan.webp';
import Footer from '../../layout/User/Components/Footer/Footer';
import { useUserProfile } from '../../hooks/useUserProfile';
import axios from 'axios';

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [filter, setFilter] = useState("all");
  const { user } = useUserProfile();

  useEffect(() => {
    const fetchBooks = async () => {
      if (user && user.id) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND}/api/assessment/get-assessment-user/${user.id}`
          );
          const fetchedBooks = response.data;
          const filteredBooks =
            filter === "all"
              ? fetchedBooks
              : fetchedBooks.filter(
                  (item) => item.assessment.state_read ===
                  (filter === "read" ? 1 : filter === "wantToRead" ? 2 : 3)
                );

          setBooks(filteredBooks);
          setRatings(Array(filteredBooks.length).fill(0)); // Initialize the ratings array
        } catch (e) {
          console.log(e);
        }
      }
    };
    fetchBooks();
  }, [user, filter]);

  const getStatusText = (stateRead) => {
    switch (stateRead) {
      case 1:
        return 'Read';
      case 2:
        return 'Want to read';
      case 3:
        return 'Currently reading';
      default:
        return 'Unknown';
    }
  };

  const handleRatingChange = async (rowIndex, rating) => {
    // Toggle rating or set the rating to the selected value
    const updatedRating = rating === ratings[rowIndex] ? 0 : rating;

    // Optimistically update the rating in the UI immediately
    setRatings((prevRatings) => {
      const newRatings = [...prevRatings];
      newRatings[rowIndex] = updatedRating;
      return newRatings;
    });

    const book = books[rowIndex];
    const assessmentId = book.assessment.id;

    // Perform the asynchronous update to the backend
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND}/api/assessment/update/${assessmentId}`, {
        star: updatedRating,
      });
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  const renderStars = (starRating, rowIndex) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <IconButton
          key={i}
          onClick={() => handleRatingChange(rowIndex, i)} // Handle star click
          style={{ padding: 0 }}
        >
          {i <= starRating ? (
            <StarIcon style={{ color: 'gold' }} />
          ) : (
            <StarBorderIcon style={{ color: 'gray' }} />
          )}
        </IconButton>
      );
    }
    return stars;
  };

  return (
    <div>
      <Box>
        <Container>
          <Typography variant="h5" className="title">
            My Books
          </Typography>
          <hr />
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <List component="ul" disablePadding>
                <ListItem component="li">
                  <Button
                    variant={filter === "all" ? "contained" : "text"}
                    color={filter === "all" ? "primary" : "default"}
                    onClick={() => setFilter("all")}
                    fullWidth
                    sx={{
                      color: filter === "all" ? "#ffffff" : "#00635d",
                      fontWeight: filter === "all" ? "bold" : "normal",
                    }}
                  >
                    All
                  </Button>
                </ListItem>
                <ListItem component="li">
                  <Button
                    variant={filter === "read" ? "contained" : "text"}
                    color={filter === "read" ? "primary" : "default"}
                    onClick={() => setFilter("read")}
                    fullWidth
                    sx={{
                      color: filter === "read" ? "#ffffff" : "#00635d",
                      fontWeight: filter === "read" ? "bold" : "normal",
                    }}
                  >
                    Read
                  </Button>
                </ListItem>
                <ListItem component="li">
                  <Button
                    variant={filter === "wantToRead" ? "contained" : "text"}
                    color={filter === "wantToRead" ? "primary" : "default"}
                    onClick={() => setFilter("wantToRead")}
                    fullWidth
                    sx={{
                      color: filter === "wantToRead" ? "#ffffff" : "#00635d",
                      fontWeight: filter === "wantToRead" ? "bold" : "normal",
                    }}
                  >
                    Want to read
                  </Button>
                </ListItem>
                <ListItem component="li">
                  <Button
                    variant={filter === "currentlyReading" ? "contained" : "text"}
                    color={filter === "currentlyReading" ? "primary" : "default"}
                    onClick={() => setFilter("currentlyReading")}
                    fullWidth
                    sx={{
                      color: filter === "currentlyReading" ? "#ffffff" : "#00635d",
                      fontWeight: filter === "currentlyReading" ? "bold" : "normal",
                    }}
                  >
                    Currently reading
                  </Button>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={10}>
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
                      <TableRow key={rowIndex}>
                        <TableCell>
                          <img
                            src={item.book[0].image || Image}
                            alt="Cover"
                            style={{ width: 50, height: 50 }}
                          />
                        </TableCell>
                        <TableCell>{item.book[0].name}</TableCell>
                        <TableCell>
                          {item.book[0].author || 'Unknown'}
                        </TableCell>
                        <TableCell>
                          {renderStars(ratings[rowIndex] || item.assessment.star, rowIndex)}
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
  );
};

export default MyBooks;
