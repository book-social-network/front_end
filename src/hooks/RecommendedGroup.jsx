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

function RecommendedGroup({ NameGroup, imgGroup, DetailGroup, StateGroup }) {
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
          sx={{ width: '100%' }}
        />
        <CardContent>
          <Link to="/group/1" style={{ textDecoration: 'none', color: '#000' }}>
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
          {StateGroup === '1' ? (
            <div style={{ display: 'flex', margin: '0.5rem' }}>
              <RemoveRedEyeIcon
                style={{ marginRight: '4px', fontSize: '1rem' }}
              />
              <Typography variant="body2">Công khai</Typography>
            </div>
          ) : (
            <div style={{ display: 'flex', margin: '0.5rem' }}>
              <VisibilityOffIcon
                style={{ marginRight: '4px', fontSize: '1rem' }}
              />
              <Typography variant="body2">Riêng tư</Typography>
            </div>
          )}
        </CardContent>

        <Button size="small" color="primary">
          <ThumbUpIcon />
          <Typography sx={{ padding: '0.5rem' }} variant="body2">
            Tham gia
          </Typography>
        </Button>
      </Card>
    </Grid>
  )
}

export default RecommendedGroup