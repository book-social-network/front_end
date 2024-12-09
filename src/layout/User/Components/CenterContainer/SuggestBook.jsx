import React, { useEffect, useState } from 'react'
import AuthorizationAxios from '../../../../hooks/Request'
import { useNavigate } from 'react-router-dom'
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function SuggestBook() {
  const navigate = useNavigate()
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchBook = async () => {
      const res = await AuthorizationAxios.get('/api/book/suggest-book')
      const resB = await res.data
      setData(resB)
    }
    fetchBook()
  }, [])

  return (
    <Box sx={{ padding: 2 }}>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={3}
        style={{ padding: '20px' }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <Card
              sx={{
                cursor: 'pointer',
                maxWidth: 300,
                margin: 'auto',
                boxShadow: 3,
                borderRadius: '12px',
              }}
              onClick={() => {
                navigate(`/detail-book/${item.id}`)
              }}
            >
              <CardMedia
                component="img"
                sx={{ maxHeight: 140 }}
                image={item.image}
                alt={item.name}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 'bold' }}
                >
                  {item.name}
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}
