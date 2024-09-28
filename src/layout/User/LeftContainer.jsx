// LeftContent.jsx
import React from "react";
import {
  Box,
  Typography,
  Container,
  TextField,
  Grid,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import BookSVG from "../../assets/images/book-open-svgrepo-com.svg";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SearchIcon from "@mui/icons-material/Search";
import LinearProgessLabel from "../../hooks/LinearProgessLabel";
import "../../css/leftContainer.css";

const LeftContainer = () => {
  return (
    <Container>
      <Box className="left-content">
      <Typography variant="h6">Currently Reading</Typography>
      <Grid>
        <IconButton>
          <AutoStoriesIcon />
        </IconButton>
        <Typography variant="p">Hôm nay bạn đọc gì?</Typography>
      </Grid>
      <Box className="search-books">
        <TextField
          placeholder="Tìm kiếm"
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <hr />
      <Typography variant="h6">2024 Reading Challenge</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} className="grid-item" sx={{backgroundColor:"bisque", mt:3}}>
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
              <Typography variant="h4">0 </Typography>
              <Typography variant="body1">books completed</Typography>
            </Link>
            <Typography className="book-count" sx={{fontSize:"0.75rem"}}>
              1 book behind schedule
            </Typography>
            <LinearProgessLabel full={200} completed={33} />
          </Box>
          <Typography variant="h6">View Challenge</Typography>
        </Grid>
      </Grid>
    </Box>
    </Container>
  );
};

export default LeftContainer;
