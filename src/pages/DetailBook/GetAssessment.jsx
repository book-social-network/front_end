import React, { useEffect, useState } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import ItemAssessment from './ItemAssessment'
import AuthorizationAxios from '../../hooks/Request'
import { useUserProfile } from '../../hooks/useUserProfile'

export default function GetAssessment({ idBook, assessment }) {
  const [data, setData] = useState([])
  const { user } = useUserProfile()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AuthorizationAxios.get(
          `/api/assessment/get-assessment-book/${idBook}`,
        )
        setData(res.data)
      } catch (error) {
        console.error('Error fetching assessments:', error)
      }
    }
    fetchData()
  }, [idBook, assessment])

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Assessments
      </Typography>
      <Box>
        {data.length === 0 ? (
          <Typography>No Assessments Available</Typography>
        ) : (
          data.map(
            (item, index) =>
              item.assessment.description != null && (
                <ItemAssessment
                  key={index}
                  description={item?.assessment?.description}
                  idUser={item?.user[0].id}
                  imageUser={item?.user[0].image_url}
                  timeStamp={item?.assessment?.created_at}
                  nameUser={item?.user[0].name}
                />
              ),
          )
        )}
      </Box>
    </Paper>
  )
}
