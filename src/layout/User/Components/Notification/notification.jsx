import NotificationItem from "./notification-item"
import { Typography} from '@mui/material'

 
export const mockNotifications = [
    {
      id: 1,
      content: "John Doe started following you.",
      type: "follow",
      name: "Thanh Hải",
      avatar: "https://via.placeholder.com/40", // Replace with an actual avatar URL
      state: 0, // 0 for unread
    },
    {
      id: 2,
      content: "Jane Smith liked your post.",
      type: "like",
      name: "Thanh Hải",
      avatar: "https://via.placeholder.com/40", // Replace with an actual avatar URL
      state: 1, // 1 for read
    },
    {
      id: 3,
      content: "Alex Johnson commented on your post.",
      type: "comment",
      name: "Thanh Hải",
      avatar: "https://via.placeholder.com/40", // Replace with an actual avatar URL
      state: 0, // 0 for unread
    },
    {
      id: 4,
      content: "Emily Davis invited you to an event.",
      type: "invited",
      name: "Thanh Hải",
      avatar: "https://via.placeholder.com/40", // Replace with an actual avatar URL
      state: 1, // 1 for read
    },
    {
      id: 5,
      content: "Chris Lee sent you a friend request.",
      type: "friend",
      name: "Thanh Hải",
      avatar: "https://via.placeholder.com/40", // Replace with an actual avatar URL
      state: 0, // 0 for unread
    },
  ];
  

  

const Notification = () => {
  return (
    <div>
      <Typography variant="h5" paddingLeft={1}>Notifications</Typography>
    {mockNotifications.map((item, index)=>(
        <NotificationItem key={index} notification={item} />
    ))}
    </div>
  )
}

export default Notification
