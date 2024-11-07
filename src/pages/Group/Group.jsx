import React, { useState } from 'react'
import '../../css/group.css'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import Footer from '../../layout/User/Components/Footer/Footer'
import RecommendedGroup from '../../hooks/RecommendedGroup'
import MyGroups from '../../hooks/MyGroups'
import Img from '../../assets/images/MeoAnhLongNgan.webp'

export default function Group() {
  const [recommendedGroup, setRecommendedGroup] = useState(true)
  return (
    <div>
      <Box>
        <Container>
          <Typography className="title" variant="h5">
            Groups
          </Typography>
          <hr />
          <Grid container spacing={2}>
            <Grid item>
              <Button
                variant={recommendedGroup === true ? 'contained' : 'outline'}
                onClick={() => {
                  setRecommendedGroup(true)
                }}
              >
                <Typography
                  variant="p"
                  className="title"
                  color={recommendedGroup === true ? '#fff' : '#00635d'}
                >
                  Recomend Groups
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant={recommendedGroup === false ? 'contained' : 'outline'}
                onClick={() => {
                  setRecommendedGroup(false)
                }}
              >
                <Typography
                  variant="p"
                  className="title"
                  color={recommendedGroup === false ? '#fff' : '#00635d'}
                >
                  My Groups
                </Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container>
            {recommendedGroup === true ? (
              <Grid container>
                <RecommendedGroup
                  NameGroup="Group mới tạo"
                  DetailGroup="Đây là Group vừa được tạo"
                  imgGroup={Img}
                  StateGroup="1"
                />
                <RecommendedGroup
                  NameGroup="Group mới tạo"
                  DetailGroup="Đây là Group vừa được tạo"
                  imgGroup={Img}
                  StateGroup="1"
                />
                <RecommendedGroup
                  NameGroup="Group mới tạo"
                  DetailGroup="Đây là Group vừa được tạo"
                  imgGroup={Img}
                  StateGroup="1"
                />
                <RecommendedGroup
                  NameGroup="Group mới tạo"
                  DetailGroup="Đây là Group vừa được tạo"
                  imgGroup={Img}
                  StateGroup="1"
                />
                <RecommendedGroup
                  NameGroup="Group mới tạo"
                  DetailGroup="Đây là Group vừa được tạo"
                  imgGroup={Img}
                  StateGroup="1"
                />
                <RecommendedGroup
                  NameGroup="Group mới tạo"
                  DetailGroup="Đây là Group vừa được tạo"
                  imgGroup={Img}
                  StateGroup="1"
                />
                <RecommendedGroup
                  NameGroup="Group mới tạo"
                  DetailGroup="Đây là Group vừa được tạo"
                  imgGroup={Img}
                  StateGroup="1"
                />
              </Grid>
            ) : (
              <div>
                <MyGroups />
              </div>
            )}

            <Grid item sm={6} xs={12}></Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </div>
  )
}
