import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Typography, Paper, Grid, IconButton, Button } from '@mui/material'
import AuthorizationAxios from '../../../../hooks/Request'
import { toast } from 'react-toastify'

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
  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      'Are you sure you want to delete this post?',
    )

    if (confirmation) {
      const previousData = [...posts]
      setPosts(posts.filter((post) => post.id !== id))

      try {
        await AuthorizationAxios.remove(`/api/post/delete/${id}`)
        toast.success('Post deleted successfully!')
      } catch (error) {
        console.error('Error deleting post:', error)
        toast.error('Failed to delete post.')

        setPosts(previousData)
      }
    }
  }
  const postColumns = [
    { field: 'postId', headerName: 'Post ID', width: 150 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'userName', headerName: 'User Name', width: 200 },
    { field: 'booksName', headerName: 'Books', width: 250 },
    { field: 'commentsCount', headerName: 'Comments Count', width: 180 },
    { field: 'likesCount', headerName: 'Likes Count', width: 180 },
    {
      field: 'edit',
      headerName: 'Edit',
      maxWidth: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() =>
            handleDelete(params.id)
          }
        >
          Edit
        </Button>
      ),
    },
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
        <Typography variant="h6" color="#00635d" sx={{ padding:2}}>
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
