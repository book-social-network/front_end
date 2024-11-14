import React, { useEffect, useState } from 'react';
import '../../css/group.css';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Footer from '../../layout/User/Components/Footer/Footer';
import RecommendedGroup from '../../hooks/RecommendedGroup';
import MyGroups from '../../hooks/MyGroups';
import Img from '../../assets/images/MeoAnhLongNgan.webp';
import axios from 'axios';

export default function Group() {
  const [recommendedGroup, setRecommendedGroup] = useState(true);
  const [allGroups, setAllGroups] = useState([]);  // Lưu trữ tất cả các nhóm
  const [randomGroups, setRandomGroups] = useState([]);  // Lưu trữ 6 nhóm ngẫu nhiên

  // Lấy tất cả nhóm từ API và chọn ngẫu nhiên 6 nhóm
  const fetchGroups = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND}/api/group/get-all`);
      setAllGroups(response.data);  // Giả sử API trả về dữ liệu nhóm
    } catch (error) {
      console.log('Error fetching groups:', error);
    }
  };

  // Chọn ngẫu nhiên 6 nhóm từ tất cả nhóm
  const getRandomGroups = () => {
    const shuffled = [...allGroups].sort(() => 0.5 - Math.random()); // Trộn tất cả nhóm
    const selectedGroups = shuffled.slice(0, 6);  // Chọn 6 nhóm đầu tiên
    setRandomGroups(selectedGroups);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (allGroups.length > 0) {
      getRandomGroups();  // Chọn 6 nhóm ngẫu nhiên khi có dữ liệu nhóm
    }
  }, [allGroups]);

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
                variant={recommendedGroup === true ? 'contained' : 'outlined'}
                onClick={() => {
                  setRecommendedGroup(true);
                  getRandomGroups();  // Khi nhấn "Recommend Groups", sẽ chọn lại 6 nhóm ngẫu nhiên
                }}
              >
                <Typography
                  variant="p"
                  className="title"
                  color={recommendedGroup === true ? '#fff' : '#00635d'}
                >
                  Recommend Groups
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant={recommendedGroup === false ? 'contained' : 'outlined'}
                onClick={() => {
                  setRecommendedGroup(false);
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
              <Grid container spacing={2}>
                {randomGroups.map(group => (
                  <RecommendedGroup
                    key={group.group.id}
                    idGroup={group.group.id}
                    NameGroup={group.group.name}
                    DetailGroup={group.group.title}
                    imgGroup={group.group.image_group}
                    StateGroup={group.group.state}
                  />
                ))}
              </Grid>
            ) : (
              <div>
                <MyGroups />
              </div>
            )}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </div>
  );
}
