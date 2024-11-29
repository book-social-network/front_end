import { useEffect } from 'react'
import Pusher from 'pusher-js'
import { toast } from 'react-toastify'

const usePusher = (userId, setNotifications) => {
  useEffect(() => {
    const pusher = new Pusher('64940ba62e7f545bd4c8', {
      cluster: 'ap2',
    })

    const notificationChannel = pusher.subscribe(`notifications.${userId}`)
    const postChannel = pusher.subscribe(`post.${userId}`)

    notificationChannel.bind('notification-event', (data) => {
      setNotifications((prev) => [...prev, data.message])
      toast.info(`New notification: ${data.message}`)
    })

    postChannel.bind('like-post', (data) => {
      setNotifications((prev) => [...prev, `Likes updated: ${data.quantity}`])
      toast.success(`Post liked: ${data.quantity} likes`)
    })

    postChannel.bind('comment-post', (data) => {
      setNotifications((prev) => [
        ...prev,
        `New comment: ${data.comment.description}`,
      ])
      toast.success(`New comment: ${data.comment.description}`)
    })

    return () => {
      notificationChannel.unbind_all()
      notificationChannel.unsubscribe()
      postChannel.unbind_all()
      postChannel.unsubscribe()
    }
  }, [userId, setNotifications])

  return null
}

export default usePusher
