import React from 'react'
import MyGroupItem from '../../../../hooks/MyGroupItem'
import { Card, CardMedia, CardContent, Typography, Grid } from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { Link } from 'react-router-dom'
import { useUserProfile } from '../../../../hooks/useUserProfile'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function MyGroups({ groups }) {
  const { user } = useUserProfile()
  const joinedGroups = groups

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        style={{
          padding: '1rem 0',
        }}
      >
        {user.groups.map((joinedGroup, index) => (
          <SwiperSlide key={index}>
            <Card
              sx={{
                ':hover': {
                  boxShadow: '2px 2px 5px #6eb3db',
                },
                height: 370,
              }}
              className="recommended-group"
            >
              <CardMedia
                component="img"
                className="img-group"
                alt={joinedGroup.name}
                image={joinedGroup.image_group}
                sx={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                }}
              />
              <CardContent>
                <Link
                  to={`/detail-group/${joinedGroup.id}`}
                  style={{ textDecoration: 'none', color: '#000' }}
                >
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {joinedGroup.name}
                  </Typography>
                </Link>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {joinedGroup.description}
                </Typography>
                <div style={{ display: 'flex', margin: '0.5rem' }}>
                  <VisibilityOffIcon
                    style={{ marginRight: '4px', fontSize: '1rem' }}
                  />
                  <Typography variant="body2">Private</Typography>
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Additional group items */}
      {joinedGroups.map((group, index) => (
        <Grid item key={index} xs={12} sm={6}>
          <MyGroupItem
            bookDescription={group.post.description}
            user_id={group.post.user_id}
            post_id={group.post.id}
            user_avatar={group.user.image_url}
            user_name={group.user.name}
            group_name={group.group.name}
            group_description={group.post.description}
            group_avatar={group.group.image_group}
            name_book={group.books[0].name}
            image_book={group.books[0].image}
            group_id={group.group.id}
            likes={group.likes.length}
            state_like={group['state-like']}
            book_id={group.books[0].id}
            book_link={group.books[0].link_book}
            timeStamp={group.post.created_at}
            noLink={true}
          />
        </Grid>
      ))}
    </>
  )
}
