import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'

export const UserContext = createContext({
  token: '',
  setToken: () => {},
})

export const PostContext = createContext({
  posts: [],
  setPosts: () => {},
  loading: false,
  addNewPost: () => {},
})

export const useUserContext = () => {
  const context = useContext(UserContext)
  return context
}

export const usePostContext = () => {
  const context = useContext(PostContext)
  return context
}

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('access_token') || '')

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  const getPosts = async () => {
    if (!token) return

    setLoading(true)
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND}/api/post/get-all`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      const postsData = await Promise.all(
        response.data.map((item) =>
          axios.get(
            `${process.env.REACT_APP_BACKEND}/api/post/get/${item.post.id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          ),
        ),
      )

      setPosts(postsData.map((res) => res.data))
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPosts()
  }, [token])

  const addNewPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts])
  }

  return (
    <UserContext.Provider value={{ token, setToken }}>
      <PostContext.Provider value={{ posts, setPosts, loading, addNewPost }}>
        {children}
      </PostContext.Provider>
    </UserContext.Provider>
  )
}
