import React, { useState } from 'react'
import { 
  Box, 
  TextField, 
  Modal, 
  Typography, 
  Button, 
  Paper, 
  IconButton,
  Avatar
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ShareIcon from '@mui/icons-material/Share'
import AuthorizationAxios from '../../hooks/Request'
import { toast } from 'react-toastify'

export default function ModalShareBook({open, close, idBook, imageBook, user}) {
    const [description, setDescription] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleShare = async () => {
        if (!description.trim()) {
            toast.error('Please add a description')
            return
        }

        setIsLoading(true)
        try {
            const res1 = await AuthorizationAxios.post('/api/post/insert', {
                description: description,
                user_id: user.user.id
            })

            await AuthorizationAxios.post('/api/post/insert-book', {
                post_id: res1.data.id,
                book_id: idBook,
            })

            await AuthorizationAxios.post('/api/user/update', {
                point: user.user.point + 3,
            })

            toast.success('You shared this book')
            close()
        } catch (error) {
            toast.error('Failed to share book')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal 
            open={open} 
            onClose={close}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Paper 
                elevation={3}
                sx={{
                    width: '100%',
                    maxWidth: 500,
                    maxHeight: '80vh',
                    borderRadius: 2,
                    outline: 'none',
                    p: 3,
                }}
            >
                <Box 
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        mb: 2 
                    }}
                >
                    <Typography variant="h6" component="h2">
                        <ShareIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                        Share Book
                    </Typography>
                    <IconButton onClick={close} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box 
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <img 
                        src={imageBook} 
                        alt="Book Cover" 
                        style={{
                            maxWidth: 200,
                            maxHeight: 300,
                            objectFit: 'contain',
                            borderRadius: 8,
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }} 
                    />

                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        label="Description"
                        placeholder="Share your thoughts about this book..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        sx={{ mt: 2 }}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        startIcon={<ShareIcon />}
                        onClick={handleShare}
                        disabled={isLoading || !description.trim()}
                        sx={{ mt: 2 }}
                    >
                        {isLoading ? 'Sharing...' : 'Share Book'}
                    </Button>
                </Box>
            </Paper>
        </Modal>
    )
}