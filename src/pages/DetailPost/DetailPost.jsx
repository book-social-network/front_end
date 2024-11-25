import React, { useEffect, useState } from 'react'
import AuthorizationAxios from '../../hooks/Request'
import { useParams } from 'react-router-dom'
import Post from '../../layout/User/Poster/Post'
import { toast } from 'react-toastify'
import {
  Avatar,
  Container,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import { IoSend } from 'react-icons/io5'
import MyGroupItem from '../../hooks/MyGroupItem'
import CommentItem from '../../layout/User/Components/Comments/CommentItem'

export default function DetailPost() {
    const param = useParams();
    const [data, setData] = useState();
    const [listComment, setListComment] = useState();
    const [comment, setComment] = useState('');
  
    useEffect(() => {
      const getData = async () => {
        const response = await AuthorizationAxios.get(`/api/post/get/${param.id}`);
        setData(response?.data);
      };
      getData();
    }, [param]);
  
    useEffect(() => {
      setListComment(data?.comments);
    }, [data]);
  
    const handleCommentSubmit = async () => {
      if (comment.trim()) {
        try {
          await AuthorizationAxios.post('/api/post/insert-comment', {
            post_id: data.post.id,
            description: comment.trim(),
          });
          toast.success('Comment submitted');
          setComment('');
  
          const updatedResponse = await AuthorizationAxios.get(`/api/post/get/${param.id}`);
          setListComment(updatedResponse?.data?.comments);
        } catch (e) {
          console.log(e);
          toast.error('Failed to submit comment');
        }
      }
    };
  
    return (
      <div>
        <Container>
          {data ? (
            data.group == null ? (
              <div>
                <Post
                bookId={data?.books[0].id}
                  bookDescription={data?.post.description}
                  bookImg={data?.books[0].image}
                  bookLink={data?.books[0].link_book}
                  bookTitle={data?.books[0].name}
                  likes={data?.likes.length}
                  postId={param?.id}
                  state_like={data?.['state_like']}
                  timeStamp={data?.post.created_at}
                  userAvatar={data?.user[0].image_url}
                  userId={data?.user[0].id}
                  userName={data?.user[0].name}
                  isDetailPostPage={true}
                />
                <div
                  className="comment-input-container"
                  style={{ maxWidth: '850px', margin: 'auto' }}
                >
                  <Avatar
                    src={data?.user[0].image_url}
                    alt="User Avatar"
                    className="comment-avatar"
                  />
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                    className="comment-input"
                    fullWidth
                  />
                  <IconButton
                    color="primary"
                    aria-label="send comment"
                    onClick={handleCommentSubmit}
                  >
                    <IoSend />
                  </IconButton>
                </div>
                {listComment?.length > 0 ? (
                  listComment.map((item, index) => (
                    <CommentItem
                      key={index}
                      userId={item.comment.user_id}
                      userImage={item.user[0].image_url}
                      userName={item.user[0].name}
                      commentId={item.comment.id}
                      commentText={item.comment.description}
                      timestamp={item.comment.created_at}
                    />
                  ))
                ) : (
                  <div>
                    <Typography sx={{ textAlign: 'center' }}>
                      Chưa có bình luận
                    </Typography>
                  </div>
                )}
              </div>
            ) : (
              <MyGroupItem />
            )
          ) : (
            <Typography sx={{ textAlign: 'center' }}>Loading...</Typography>
          )}
        </Container>
      </div>
    );
  }
  
