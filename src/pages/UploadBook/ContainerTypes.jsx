import React, { useEffect, useState } from 'react'
import AuthorizationAxios from '../../hooks/Request'
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  IconButton,
} from '@mui/material'
import { TiDelete } from 'react-icons/ti'

export default function ContainerType({
  selectedTypes,
  setSelectedTypes,
}) {
  const [allTypes, setAllTypes] = useState([])

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await AuthorizationAxios.get('/api/type/get-all')
        setAllTypes(res.data)
      } catch (error) {
        console.error('Failed to fetch types:', error)
      }
    }

    fetchTypes()
  }, [])

  const handleSelectType = (event) => {
    const selectedTypeId = event.target.value
    const typeOption = allTypes.find(
      (type) => type.type.id === selectedTypeId,
    )

    if (
      typeOption &&
      !selectedTypes.some((type) => type.type.id === selectedTypeId)
    ) {
      setSelectedTypes((prevType) => [...prevType, typeOption])
    }
  }

  const hanleDeleteType = (typeDelete) => () => {
    setSelectedTypes((prevType) =>
      prevType.filter((type) => type.type.id !== typeDelete.type.id),
    )
  }



  return (
    <div>
     {selectedTypes.length > 0 &&  <>
        <Typography variant="h6" paddingLeft={3}>
        Selected Type
      </Typography>
      <div
        style={{
          border: '2px solid #000',
          margin: '5px 5px 5px 25px',
          padding: 10,
          borderRadius: 5,
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {selectedTypes.map((type) => (
          <Grid
            key={type.id}
            display="flex"
            padding={0.5}
            justifyContent="center"
            alignItems="center"
            marginRight={1}
            sx={{
              borderRadius: '10px',
              border: '1px solid blue',
              fontSize: '13px',
            }}
          >
            <Typography variant="body2">{type.type.name}</Typography>
            <IconButton onClick={hanleDeleteType(type)}>
              <TiDelete />
            </IconButton>
          </Grid>
        ))}
      </div>
     </>}

      <Grid item xs={12} sx={{ margin: '5px 5px 5px 25px' }}>
        <FormControl fullWidth>
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            value=""
            onChange={handleSelectType}
            label="type"
            sx={{
              bgcolor: '#fff',
              '& .MuiInputLabel-root': {
                color: '#000',
                fontWeight: 'bold',
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '&:hover fieldset': { borderColor: '#000' },
                '&.Mui-focused fieldset': { borderColor: '#000' },
              },
            }}
          >
            {allTypes
              .filter(
                (type) =>
                  !selectedTypes.some(
                    (selected) => selected.type.id === type.type.id,
                  ),
              )
              .map((type) => (
                <MenuItem key={type.type.id} value={type.type.id}>
                  {type.type.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
    </div>
  )
}
