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
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import '../../css/MyBooks.css';
import Image from '../../assets/images/MeoAnhLongNgan.webp';
import Footer from '../../layout/User/Components/Footer/Footer';

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [ratings, setRatings] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      const fetchedBooks = [
        { title: 'Book 1', author: 'Author 1', image: Image },
        { title: 'Book 2', author: 'Author 2', image: Image },
        { title: 'Book 3', author: 'Author 3', image: Image },
      ];
      setBooks(fetchedBooks);
      setRatings(Array(fetchedBooks.length).fill(0));
    };

    fetchBooks();
  }, []);

  const handleRatingChange = (rowIndex, rating) => {
    setRatings((prevRatings) => {
      const newRatings = [...prevRatings];
      newRatings[rowIndex] = rating === newRatings[rowIndex] ? 0 : rating;
      return newRatings;
    });
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
                  <Link href="#" underline="none" className="link-item">
                    All
                  </Link>
                </ListItem>
                <ListItem component="li">
                  <Link href="#" underline="none" className="link-item">
                    Read
                  </Link>
                </ListItem>
                <ListItem component="li">
                  <Link href="#" underline="none" className="link-item">
                    Want to read
                  </Link>
                </ListItem>
                <ListItem component="li">
                  <Link href="#" underline="none" className="link-item">
                    Current reading
                  </Link>
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
                    {books.map((book, rowIndex) => (
                      <TableRow key={rowIndex}>
                        <TableCell>
                          <img
                            src={book.image}
                            alt="Cover"
                            style={{ width: 50, height: 50 }}
                          />
                        </TableCell>
                        <TableCell>{book.title}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>
                          {Array.from({ length: 5 }, (_, index) => (
                            <IconButton
                              key={index}
                              aria-label="rate"
                              sx={{ padding: 0 }}
                              onClick={() =>
                                handleRatingChange(rowIndex, index + 1)
                              }
                            >
                              {ratings[rowIndex] > index ? (
                                <StarIcon
                                  style={{ color: 'gold', padding: 0 }}
                                />
                              ) : (
                                <StarBorderIcon />
                              )}
                            </IconButton>
                          ))}
                        </TableCell>
                        <TableCell>
                          <p>Status</p>
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
