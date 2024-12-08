import NearMeIcon from '@mui/icons-material/NearMe'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ChatIcon from '@mui/icons-material/Chat'
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle'
import GppMaybeIcon from '@mui/icons-material/GppMaybe'
const getIconNotificationType = (type) => {
  const mainType = type.split('-')[0]
  switch (mainType) {
    case 'follow':
      return <AccountCircleIcon />
      break
    case 'member':
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
    case 'admin':
      return <GppMaybeIcon sx={{ fontSize: 12 }} />
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
