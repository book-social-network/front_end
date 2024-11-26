import NearMeIcon from "@mui/icons-material/NearMe"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import ChatIcon from "@mui/icons-material/Chat"
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
const getIconNotificationType = (type) => {
  switch (type) {
    case "follow":
      return <AccountCircleIcon/>
      break
      case "friend":
      return <AccountCircleIcon />
      break
    case "like":
      return <ThumbUpIcon sx={{
        fontSize: 12, 
      }}/>
      break
    case "comment":
      return <ChatIcon sx={{
        fontSize: 12, 
      }}/>
      break
      case "invited":
      return <SupervisedUserCircleIcon />
      break

    default:
      return <NearMeIcon />
  }
}

export default getIconNotificationType
