import React, { useState, useEffect } from 'react'
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import AuthorizationAxios from '../../hooks/Request'

export default function ModalUpdateGroup({
  id,
  name,
  title,
  description,
  image,
  state,
  openModal,
  closeModal,
}) {
  const [groupName, setGroupName] = useState(name)
  const [groupTitle, setGroupTitle] = useState(title)
  const [groupDescription, setGroupDescription] = useState(description)
  const [groupImage, setGroupImage] = useState(image)
  const [groupState, setGroupState] = useState(state)

  useEffect(() => {
    setGroupName(name)
    setGroupTitle(title)
    setGroupDescription(description)
    setGroupImage(image)
    setGroupState(state)
  }, [openModal, name, title, description, image, state])

  const handleStateChange = (event) => {
    setGroupState(event.target.value)
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setGroupImage(file)
    }
  }

  const handleUpdate = async () => {
    const formData = new FormData()
    formData.append('name', groupName)
    formData.append('title', groupTitle)
    formData.append('description', groupDescription)
    formData.append('image', groupImage)
    formData.append('state', groupState)

    try {
      await AuthorizationAxios.postUpload(`/api/group/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      closeModal()
    } catch (error) {
      console.error('Error updating group:', error)
    }
  }

  return (
    <Modal open={openModal} onClose={closeModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          padding: 4,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" mb={2}>
          Chỉnh sửa nhóm
        </Typography>

        <TextField
          fullWidth
          label="Tên nhóm"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Tiêu đề"
          value={groupTitle}
          onChange={(e) => setGroupTitle(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Mô tả"
          value={groupDescription}
          onChange={(e) => setGroupDescription(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Ảnh nhóm"
          sx={{ mb: 2 }}
          type="file"
          onChange={handleImageChange}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Trạng thái</InputLabel>
          <Select
            value={groupState}
            onChange={handleStateChange}
            label="Trạng thái"
          >
            <MenuItem value={0}>Công khai</MenuItem>
            <MenuItem value={1}>Riêng tư</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={closeModal}>
            Hủy
          </Button>
          <Button variant="contained" onClick={handleUpdate}>
            Cập nhật
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
