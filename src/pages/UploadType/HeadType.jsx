import React, { useState, useRef, useEffect } from 'react'
import { Box, Button, Container, Input, Typography } from '@mui/material'

function HeadType({ types }) {
  const [scrollVisible, setScrollVisible] = useState(false)
  const [filteredTypes, setFilteredTypes] = useState(types || [])
  const [valueSearch, setValueSearch] = useState('')
  const containerRef = useRef(null)

  useEffect(() => {
    setFilteredTypes(types)
  }, [types])

  const handleSearch = (e) => {
    const searchValue = e.target.value
    setValueSearch(searchValue)

    if (searchValue === '') {
      setFilteredTypes(types)
    } else {
      setFilteredTypes(
        types.filter(
          (item) =>
            item.type &&
            item.type.name &&
            item.type.name.toLowerCase().includes(searchValue.toLowerCase()),
        ),
      )
    }
  }

  const handleScroll = () => {
    setScrollVisible(true)

    setTimeout(() => {
      setScrollVisible(false)
    }, 2000)
  }

  return (
    <Box sx={{ marginTop: 2 }}>
      <Container sx={{ textAlign: 'center', marginBottom: 2 }}>
        <Typography
          variant="body1"
          sx={{ fontWeight: 'bold', marginBottom: 1 }}
        >
          Search Type
        </Typography>
        <Input
          placeholder="Enter type name"
          value={valueSearch}
          onChange={handleSearch}
          sx={{
            width: '100%',
            maxWidth: '400px',
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            outline: 'none',
            '&:focus': {
              borderColor: '#000',
            },
            bgcolor: '#fff',
          }}
        />
      </Container>

      <Box
        ref={containerRef}
        onScroll={handleScroll}
        sx={{
          maxWidth: 600,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1.5,
          justifyContent: 'center',
          padding: 2,
          maxHeight: '10em',
          overflowY: 'auto',
          border: '1px solid #ccc',
          borderRadius: '8px',
          bgcolor: '#fff',
          '&::-webkit-scrollbar': {
            width: '8px',
            backgroundColor: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
          },
        }}
      >
        {filteredTypes.length > 0 ? (
          filteredTypes.map((item, index) => (
            <Button
              key={index}
              sx={{
                padding: '6px 12px',
                border: '1px solid black',
                borderRadius: '20px',
                textTransform: 'none',
                fontWeight: 'bold',
                color: '#000',
                backgroundColor: '#fff',
                transition: 'all 0.3s ease',
                ':hover': {
                  backgroundColor: '#f0f0f0',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                },
              }}
            >
              {item.type && item.type.name}
            </Button>
          ))
        ) : (
          <Typography
            variant="body2"
            sx={{ color: '#999', fontStyle: 'italic', marginTop: 2 }}
          >
            Type not found
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default HeadType
