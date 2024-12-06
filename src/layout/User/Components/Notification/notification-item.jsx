import React from 'react'
import { Avatar, Badge, Box, Typography } from '@mui/material'
import BlockAcceptFriend from './block-accept-friend'
import BlockJoinGroup from './block-join-group'
import getIconNotificationType from './get-icon-notification-type'

const NotificationItem = ({ notification }) => {
  const mainType = notification.type.split('-')[0]
  const id = notification.type_id.split('-')[0]
  const info = notification.information.includes('mời')

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding={1}
      margin={1}
      bgcolor="#f5f5f5"
      borderRadius={2}
      boxShadow={1}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <Box
              sx={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                bgcolor: '#007bff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 10,
                fontWeight: 'bold',
              }}
            >
              {getIconNotificationType(notification.type)}
            </Box>
          }
        >
          <Avatar />
        </Badge>
        <Box>
          <Typography fontSize={14} fontWeight="bold">
            {notification.name}
          </Typography>
          <Typography fontSize={14}>{notification.information}</Typography>
          {mainType === 'group' && (
            <BlockJoinGroup idGroup={id} info={info} idNoti={notification.id} />
          )}
          {mainType === 'member' && (
            <BlockAcceptFriend id_user={id} idNoti={notification.id} />
          )}
        </Box>
      </Box>

      <Box textAlign="right">
        {notification.state === 0 && (
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: '#007bff',
              marginTop: 0.5,
            }}
          />
        )}
      </Box>
    </Box>
  )
}

export default NotificationItem
