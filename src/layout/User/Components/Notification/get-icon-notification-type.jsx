import NearMeIcon from '@mui/icons-material/NearMe'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ChatIcon from '@mui/icons-material/Chat'
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle'
const getIconNotificationType = (type) => {
  const mainType = type.split('-')[0]
  switch (mainType) {
    case 'follow':
      return <AccountCircleIcon />
      break
    case 'user':
      return <AccountCircleIcon />
      break
    case 'post':
      return (
        <ThumbUpIcon
          sx={{
            fontSize: 12,
          }}
        />
      )
      break
    case 'comment':
      return (
        <ChatIcon
          sx={{
            fontSize: 12,
          }}
        />
      )
      break
    case 'group':
      return <SupervisedUserCircleIcon />
      break

    default:
      return <NearMeIcon />
  }
}

export default getIconNotificationType
