import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Typography, Paper, Button } from '@mui/material'
import AuthorizationAxios from '../../../../hooks/Request'
import { toast } from 'react-toastify'

const PostList = ({ path }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await AuthorizationAxios.get(path)
        setPosts(res.data)
        setLoading(false)
      } catch (error) {
        console.error(`Error fetching posts from ${path}:`, error)
        setLoading(false)
      }
    }

    fetchPosts()
  }, [path])

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
    { field: 'reported', headerName: 'Reports Count', width: 180 },
    {
      field: 'Delete',
      headerName: 'Delete',
      maxWidth: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(params.id)}
        >
          Delete
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
    reported: postData.warning.length,
  }))

  return (
    <Paper sx={{ height: 400, width: '100%', mt: 3 }}>
      <Typography
        variant="subtitle1"
        color="#00635d"
        align="left"
        sx={{ mb: 2 }}
      >
        Total posts: {posts.length}
      </Typography>
      <DataGrid
        rows={postRows}
        columns={postColumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        loading={loading}
      />
    </Paper>
  )
}

export default PostList
