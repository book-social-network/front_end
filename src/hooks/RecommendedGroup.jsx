import React from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Grid,
} from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import '../css/RecommendedGroup.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { Link } from 'react-router-dom'
import { useUserProfile } from './useUserProfile'
import AuthorizationAxios from './Request'
import { toast } from 'react-toastify'

function RecommendedGroup({
  idGroup,
  NameGroup,
  imgGroup,
  DetailGroup,
  StateGroup,
}) {
  const { user } = useUserProfile();
  const handleJoin = async () => {
    await AuthorizationAxios.post('/api/detail-group-user/insert', {
      user_id: user?.user.id,
      group_id: idGroup,
    })
    toast.success('Joined group success')
  }
  return (
    <Grid sm={4} xs={6} item>
      <Card
        sx={{
          ':hover': {
            boxShadow: '2px 2px 5px #6eb3db',
          },
        }}
        className="recommended-group"
      >
        <CardMedia
          component="img"
          className="img-group"
          alt={NameGroup}
          image={imgGroup}
          sx={{ width: '100%', height: "200px !important", objectFit:'cover' }}
        />
        <CardContent>
          <Link
            to={`/detail-group/${idGroup}`}
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
              {NameGroup}
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
            {DetailGroup}
          </Typography>
          {StateGroup === 0 ? (
            <div style={{ display: 'flex', margin: '0.5rem' }}>
              <RemoveRedEyeIcon
                style={{ marginRight: '4px', fontSize: '1rem' }}
              />
              <Typography variant="body2">Public</Typography>
            </div>
          ) : (
            <div style={{ display: 'flex', margin: '0.5rem' }}>
              <VisibilityOffIcon
                style={{ marginRight: '4px', fontSize: '1rem' }}
              />
              <Typography variant="body2">Private</Typography>
            </div>
          )}
        </CardContent>

        <Button size="small" color="primary" onClick={handleJoin}>
          <ThumbUpIcon />
          <Typography sx={{ padding: '0.5rem' }} variant="body2">
            Join
          </Typography>
        </Button>
      </Card>
    </Grid>
  )
}

export default RecommendedGroup
