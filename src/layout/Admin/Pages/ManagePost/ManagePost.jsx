import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Typography, Paper, Grid, IconButton } from '@mui/material'
import AuthorizationAxios from '../../../../hooks/Request'
import { FaPlus } from 'react-icons/fa'

export default function ManagePosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await AuthorizationAxios.get('/api/post/get-all')
        setPosts(res.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching posts:', error)
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const postColumns = [
    { field: 'postId', headerName: 'Post ID', width: 150 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'userName', headerName: 'User Name', width: 200 },
    { field: 'booksName', headerName: 'Books', width: 250 },
    { field: 'commentsCount', headerName: 'Comments Count', width: 180 },
    { field: 'likesCount', headerName: 'Likes Count', width: 180 },
  ]

  const postRows = posts.map((postData) => ({
    id: postData.post.id,
    postId: postData.post.id,
    description: postData.post.description,
    userName: postData.user.name,
    booksName: postData.books.map((book) => book.name).join(', '),
    commentsCount: postData.commemts.length,
    likesCount: postData.likes.length,
  }))

  return (
    <div>
      <Typography
        variant="h4"
        color="#00635d"
        fontWeight="bold"
        align="center"
        sx={{ mt: 3 }}
      >
        Manage Posts
      </Typography>
      <hr />
        <Typography
          variant="subtitle1"
          color="#00635d"
          align="left"
          sx={{ mb: 2 }}
        >
          Total posts: {posts.length}
        </Typography>

      <Paper sx={{ height: 400, width: '100%' }}>
        <Typography variant="h6" color="#00635d" sx={{ mb: 2 }}>
          Posts List
        </Typography>
        <DataGrid
          rows={postRows}
          columns={postColumns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          loading={loading}
        />
      </Paper>
    </div>
  )
}
