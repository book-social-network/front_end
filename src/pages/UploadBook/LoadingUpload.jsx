import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  LinearProgress,
} from '@mui/material'
import AuthorizationAxios from '../../hooks/Request'
import { toast } from 'react-toastify'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function AlertDialogSlide({
  setIsUpload,
  nameBook,
  image,
  description,
  linkBook,
  arraySelectedAuthor,
  arraySelectedType,
}) {
  const [open, setOpen] = React.useState(true)
  const [progress, setProgress] = React.useState(0)
  const [dataBook, setDataBook] = React.useState(null)
  const [dataAuthor, setDataAuthor] = React.useState(false)
  const totalTasks = 1 + arraySelectedAuthor.length + arraySelectedType.length
  console.log(totalTasks);
  const uploadBook = async () => {
    const formData = new FormData()
    formData.append('name', nameBook)
    formData.append('image', image)
    formData.append('link_book', linkBook)
    formData.append('description', description)

    try {
      const res = await AuthorizationAxios.postUpload(
        '/api/book/insert',
        formData,
      )
      const book = await res.data
      setDataBook(book)
      setProgress(progress + 1)
    } catch (error) {
      console.error('Error uploading book:', error)
      return false
    }
  }

  const insertAuthors = async (author_id, book_id) => {
    try {
      const authorPromises = AuthorizationAxios.post(
        '/api/book/insert-author',
        {
          author_id: author_id,
          book_id: book_id,
        },
      )
      console.log(authorPromises.data)
    } catch (error) {
      console.error('Error inserting authors:', error)
      return false
    }
  }

  const insertTypes = async (type_id, book_id) => {
    try {
      const typePromises = AuthorizationAxios.post('/api/book/insert-type', {
        type_id: type_id,
        book_id: book_id,
      })
    } catch (error) {
      console.error('Error inserting types:', error)
      return false
    }
  }

  React.useEffect(() => {
    if (progress < 1 && dataBook === null) {
      uploadBook()
    }
  }, [])

  React.useEffect(() => {
    if (progress < 2 && dataBook !== null) {
      for (const item of arraySelectedAuthor) {
        insertAuthors(item.id, dataBook.id)
        setProgress(progress + 1)
      }
      setDataAuthor(true)
    }
  }, [dataBook, progress])

  React.useEffect(() => {
    if (progress < totalTasks && dataBook !== null && dataAuthor) {
      for (const item of arraySelectedType) {
        insertTypes(item.type.id, dataBook.id)
        setProgress(progress + 1)
      }
    }

    if (progress >= totalTasks) {
      toast.success('Upload successfully!!!')
        setIsUpload(false)
    }
  }, [dataAuthor])
  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Uploading book...'}</DialogTitle>
        <DialogContent>
          <LinearProgress variant="determinate" value={progress} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}
