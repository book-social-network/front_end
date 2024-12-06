import React, { useState, useRef, useEffect } from 'react'
import { Box, Button } from '@mui/material'
import AuthorizationAxios from '../hooks/Request'

function GenreSelector() {
  const [selectedGenres, setSelectedGenres] = useState([])
  const [scrollVisible, setScrollVisible] = useState(false)
  const [types, setTypes] = useState([])
  const containerRef = useRef(null)

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    )
  }
  useEffect(() => {
    const fetchType = async () => {
      const data = await AuthorizationAxios.get('/api/type/get-all')
      setTypes(data.data)
    }
    fetchType()
  }, [types])

  const handleScroll = () => {
    setScrollVisible(true)

    setTimeout(() => {
      setScrollVisible(false)
    }, 2000)
  }

  return (
    <Box
      ref={containerRef}
      onScroll={handleScroll}
      sx={{
        maxWidth: 600,
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        justifyContent: 'center',
        padding: 2,
        maxHeight: '9.6em',
        overflowY: 'auto',
        border: '1px solid #ccc',
        borderRadius: '8px',
        scrollbarWidth: scrollVisible ? 'auto' : 'none',
        '&::-webkit-scrollbar': {
          display: scrollVisible ? 'block' : 'none',
        },
      }}
    >
      {types.map((type, index) => (
        <Button
          key={index}
          variant={selectedGenres.includes(type) ? 'contained' : 'outlined'}
          onClick={() => toggleGenre(type)}
          sx={{
            borderRadius: '20px',
            textTransform: 'none',
            fontWeight: 'bold',
            color: selectedGenres.includes(type) ? '#fff' : '#000',
            borderColor: '#000',
            ':hover': {
              backgroundColor: selectedGenres.includes(type)
                ? '#0056b3'
                : '#e0e0e0',
            },
          }}
        >
          {type.name}
        </Button>
      ))}
    </Box>
  )
}

export default GenreSelector
