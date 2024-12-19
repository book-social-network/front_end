import React, { useState } from 'react'
import {
  Modal,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Divider,
} from '@mui/material'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import AuthorizationAxios from '../../../hooks/Request'
import { toast } from 'react-toastify'

export default function ModalReport({ open, close, id }) {
  const [selectedReason, setSelectedReason] = useState('')
  const [customReason, setCustomReason] = useState('')

  const handleReasonChange = (event) => {
    const reason = event.target.value
    setSelectedReason(reason)
    setCustomReason('')
  }

  const handleSubmit = async () => {
    const reasonToSubmit =
      selectedReason === 'Other' ? customReason : selectedReason

    if (!reasonToSubmit.trim()) {
      alert('Please provide a reason for reporting.')
      return
    }

    const res = await AuthorizationAxios.post(`/api/warnings/report/${id}`, {
      description: reasonToSubmit,
    })
    if (res?.data) {
      toast.warn('You reported!!!')
    } else {
      toast.warning('You only can only report a maximum of 3 times!!!')
    }
    close()
    setSelectedReason('')
    setCustomReason('')
  }

  return (
    <Modal open={open} onClose={close}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 450,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <ReportProblemIcon color="error" sx={{ mr: 1, fontSize: 30 }} />
          <Typography variant="h6" component="h2">
            Report Post
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Please select the reason for reporting this post:
        </Typography>

        <RadioGroup value={selectedReason} onChange={handleReasonChange}>
          <FormControlLabel value="Spam" control={<Radio />} label="Spam" />
          <FormControlLabel
            value="Inappropriate post"
            control={<Radio />}
            label="Inappropriate post"
          />
          <FormControlLabel
            value="I don't like this post"
            control={<Radio />}
            label="I don't like this post"
          />
          <FormControlLabel value="Other" control={<Radio />} label="Other" />
        </RadioGroup>

        {selectedReason === 'Other' && (
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Enter your reason..."
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
            sx={{ mt: 2 }}
          />
        )}

        <Divider sx={{ mt: 3, mb: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={close} sx={{ mr: 1 }}>
            Hủy
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleSubmit}
            disabled={
              !selectedReason ||
              (selectedReason === 'Other' && !customReason.trim())
            }
          >
            Gửi
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
