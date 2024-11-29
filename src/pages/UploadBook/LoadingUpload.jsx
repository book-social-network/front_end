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
  resetForm
}) {
  const [open, setOpen] = React.useState(true)
  const [progress, setProgress] = React.useState(0)
  const [dataBook, setDataBook] = React.useState(null)
  const [dataAuthor, setDataAuthor] = React.useState(false)

  const totalTasks = 1 + arraySelectedAuthor.length + arraySelectedType.length

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
      setProgress((prev) => prev + 1)
    } catch (error) {
      console.error('Error uploading book:', error)
      toast.error('Failed to upload book!')
    }
  }

  const insertAuthors = async (author_id, book_id) => {
    try {
      await AuthorizationAxios.post('/api/book/insert-author', {
        author_id: author_id,
        book_id: book_id,
      })
    } catch (error) {
      console.error('Error inserting authors:', error)
      toast.error('Failed to associate authors with the book!')
    }
  }

  const insertTypes = async (type_id, book_id) => {
    try {
      await AuthorizationAxios.post('/api/book/insert-type', {
        type_id: type_id,
        book_id: book_id,
      })
    } catch (error) {
      console.error('Error inserting types:', error)
      toast.error('Failed to associate types with the book!')
    }
  }

  React.useEffect(() => {
    if (progress < 1 && dataBook === null) {
      uploadBook()
    }
  }, [dataBook, progress])

  React.useEffect(() => {
    const processAuthors = async () => {
      for (const item of arraySelectedAuthor) {
        await insertAuthors(item.id, dataBook.id)
        setProgress((prev) => prev + 1)
      }
      setDataAuthor(true)
    }

    if (dataBook !== null && progress < 1 + arraySelectedAuthor.length) {
      processAuthors()
    }
  }, [dataBook, arraySelectedAuthor])

  React.useEffect(() => {
    const processTypes = async () => {
      for (const item of arraySelectedType) {
        await insertTypes(item.type.id, dataBook.id)
        setProgress((prev) => prev + 1)
      }
    }

    if (dataAuthor && progress < totalTasks && dataBook !== null) {
      processTypes()
    }
  }, [dataAuthor, arraySelectedType, dataBook, totalTasks])

  React.useEffect(() => {
    if (progress >= totalTasks) {
      toast.success('Upload successfully!!!')
      setIsUpload(false)
      resetForm()
    }
  }, [progress, totalTasks, setIsUpload, resetForm])

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
          <LinearProgress
            variant="determinate"
            value={(progress / totalTasks) * 100}
          />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}
