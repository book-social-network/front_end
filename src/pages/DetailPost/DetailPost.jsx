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
import Pusher from 'pusher-js'
export default function DetailPost() {
  const param = useParams()
  const [data, setData] = useState()
  const [listComment, setListComment] = useState()
  const [comment, setComment] = useState('')

  useEffect(() => {
    getData()
  }, [param])

  const getData = async () => {
    const response = await AuthorizationAxios.get(`/api/post/get/${param.id}`)
    setData(response?.data)
  }
  useEffect(() => {
    setListComment(data?.comments)
  }, [])

  useEffect(() => {
    const pusher = new Pusher('64940ba62e7f545bd4c8', {
      cluster: 'ap2',
    })

    const channelPost = pusher.subscribe(`post.${param.id}`)
    channelPost.bind('comment-post', (data) => {
      console.log(data)
    })
  }, [])

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      try {
        await AuthorizationAxios.post('/api/post/insert-comment', {
          post_id: data.post.id,
          description: comment.trim(),
        })
        toast.success('Comment submitted')
        setComment('')

        const updatedResponse = await AuthorizationAxios.get(
          `/api/post/get/${param.id}`,
        )
        setListComment(updatedResponse?.data?.comments)
      } catch (e) {
        console.log(e)
        toast.error('Failed to submit comment')
      }
    }
  }

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
                    setComment(e.target.value)
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
                    getData={getData}
                  />
                ))
              ) : (
                <div>
                  <Typography sx={{ textAlign: 'center' }}>
                    No comment
                  </Typography>
                </div>
              )}
            </div>
          ) : (
            <div>
              <MyGroupItem
                book_link={data?.books[0].link_book}
                group_avatar={data?.group.image_group}
                group_id={data?.group.id}
                group_name={data?.group.name}
                image_book={data?.books[0].image}
                likes={data?.likes.length}
                name_book={data?.books[0].name}
                state_like={data?.['state_like']}
                user_avatar={data?.user[0].image_url}
                user_id={data?.user[0].id}
                user_name={data?.user[0].name}
                bookDescription={data?.post.description}
                book_id={data?.books[0].id}
                isDetailPostPage={true}
                timeStamp={data?.post.created_at}
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
                    setComment(e.target.value)
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
                    getData={getData}
                  />
                ))
              ) : (
                <div>
                  <Typography sx={{ textAlign: 'center' }}>
                    No comment
                  </Typography>
                </div>
              )}
            </div>
          )
        ) : (
          <Typography sx={{ textAlign: 'center' }}>Loading...</Typography>
        )}
      </Container>
    </div>
  )
}
