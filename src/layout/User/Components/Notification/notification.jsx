// import { useEffect, useState } from 'react'
// import NotificationItem from './notification-item'
// import { Typography } from '@mui/material'
// import AuthorizationAxios from '../../../../hooks/Request'

// export const mockNotifications = [
//   {
//     id: 1,
//     content: 'John Doe started following you.',
//     type: 'follow',
//     name: 'Thanh Hải',
//     avatar: 'https://via.placeholder.com/40',
//     state: 0,
//   },
//   {
//     id: 2,
//     content: 'Jane Smith liked your post.',
//     type: 'like',
//     name: 'Thanh Hải',
//     avatar: 'https://via.placeholder.com/40',
//     state: 1,
//   },
//   {
//     id: 3,
//     content: 'Alex Johnson commented on your post.',
//     type: 'comment',
//     name: 'Thanh Hải',
//     avatar: 'https://via.placeholder.com/40',
//     state: 0,
//   },
//   {
//     id: 4,
//     content: 'Emily Davis invited you to an event.',
//     type: 'invited',
//     name: 'Thanh Hải',
//     avatar: 'https://via.placeholder.com/40',
//     state: 1,
//   },
//   {
//     id: 5,
//     content: 'Chris Lee sent you a friend request.',
//     type: 'friend',
//     name: 'Thanh Hải',
//     avatar: 'https://via.placeholder.com/40',
//     state: 0,
//   },
// ]

// const Notification = () => {
//   return (
//     <div>
//       <Typography variant="h5" paddingLeft={1}>
//         Notifications
//       </Typography>
//       {mockNotifications.map((item, index) => (
//         <NotificationItem key={index} notification={item} />
//       ))}
//     </div>
//   )
// }

import React, { useEffect, useState } from 'react'
import NotificationItem from './notification-item'
import { Typography } from '@mui/material'
import AuthorizationAxios from '../../../../hooks/Request'

const Notification = () => {
  const [notifications, setNotifications] = useState([]) //
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await AuthorizationAxios.get('/api/notification/get-all')
        setNotifications(response.data.notifications)
      } catch (error) {
        console.error('Error fetching notifications:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  return (
    <div>
      <Typography variant="h5" paddingLeft={1}>
        Notifications
      </Typography>

      {loading ? (
        <Typography variant="body2">Loading notifications...</Typography>
      ) : (
        notifications.map((item, index) => (
          <NotificationItem key={index} notification={item} />
        ))
      )}
    </div>
  )
}

export default Notification
