import React, { useState } from "react";
import Logo from "../../assets/images/MeoAnhLongNgan.webp";
import {
  Grid,
  Avatar,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import { Favorite, ChatBubble, Share } from "@mui/icons-material";
import AvatarUser from "../../assets/images/MeoAnhLongNgan.webp";
import "../../css/centerContainer.css"; 

function CenterContainer() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment) {
      setComments([...comments, { text: newComment, user: "Minh Đức" }]);
      setNewComment("");
    }
  };

  return (
    <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
      <Grid item xs={12} md={12}>
        <Card className="center-container-card">
          <CardHeader
            avatar={
              <Avatar
                alt="avatar user"
                src={AvatarUser}
                className="avatar"
              />
            }
            title={
              <Typography
                variant="h6"
                className="card-title"
              >
                Minh Đức
              </Typography>
            }
            subheader={<Typography variant="body2">2 giờ trước</Typography>}
          />

          <CardContent>
            <Typography variant="h6" gutterBottom>
              Tên sách
            </Typography>
            <Typography variant="body1" gutterBottom>
              Review sách
            </Typography>
            <img
              src={Logo}
              alt="Book cover"
              className="book-cover"
            />
            <Typography variant="body2" sx={{ marginTop: 2 }}>
              <a
                href="https://www.goodreads.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="book-link"
              >
                Tên sách
              </a>
            </Typography>
          </CardContent>

          <Divider />

          <CardActions disableSpacing className="card-actions"> {/* Apply CSS class */}
            <Grid container alignItems="center" justifyContent="center">
              <Grid item>
                <IconButton
                  aria-label="like"
                  color="primary"
                  className="icon-button"
                >
                  <Favorite sx={{ color: "#e53935" }} />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="body2">Thích</Typography>
              </Grid>
            </Grid>

            <Grid container alignItems="center" justifyContent="center">
              <Grid item>
                <IconButton
                  aria-label="comment"
                  color="primary"
                  className="icon-button"
                >
                  <ChatBubble sx={{ color: "#1e88e5" }} />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="body2">Bình luận</Typography>
              </Grid>
            </Grid>

            <Grid container alignItems="center" justifyContent="center">
              <Grid item>
                <IconButton
                  aria-label="share"
                  color="primary"
                  className="icon-button"
                >
                  <Share sx={{ color: "#fb8c00" }} />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography variant="body2">Chia sẻ</Typography>
              </Grid>
            </Grid>
          </CardActions>

          <Divider />

          <CardContent>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Avatar alt="avatar user" src={AvatarUser} />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  variant="outlined"
                  placeholder="Viết bình luận..."
                  size="small"
                  className="comment-input"
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddComment}
                  className="send-button"
                >
                  Gửi
                </Button>
              </Grid>
            </Grid>

            <Grid container direction="column" sx={{ marginTop: 2 }}>
              {comments.map((comment, index) => (
                <Grid item key={index} sx={{ marginBottom: 2 }}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <Avatar alt="avatar user" src={AvatarUser} />
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="subtitle1"
                        className="comment-user"
                      >
                        {comment.user}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography variant="body2" sx={{ marginLeft: 5 }}>
                    {comment.text}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default CenterContainer;
