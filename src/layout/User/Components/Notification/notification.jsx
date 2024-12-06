import React, { useEffect, useState, useRef } from 'react'
import NotificationItem from './notification-item'
import { Typography } from '@mui/material'
import AuthorizationAxios from '../../../../hooks/Request'
import {useUserProfile} from '../../../../hooks/useUserProfile'
import Pusher from 'pusher-js';
import { toast } from 'react-toastify'

const Notification = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const {user} = useUserProfile()


  const sentinelRef = useRef(null)
  

  useEffect(() => {
    const pusher = new Pusher('64940ba62e7f545bd4c8', {
      cluster: 'ap2',
    });
    const channel = pusher.subscribe(`notifications.${user?.user.id}`);
    channel.bind('notification-event', (data) => {
      toast.success("You have a new notification")
    });

    const fetchNotifications = async () => {
      if (!hasMore) return

      try {
        setLoading(true)
        const response = await AuthorizationAxios.get(
          `/api/notification/get-all?page=${page}`,
        )
        const { notifications: newNotifications, quantity_pages } =
          response.data

        setNotifications((prev) => [...prev, ...newNotifications])

        if (page >= quantity_pages) {
          setHasMore(false)
        }
      } catch (error) {
        console.error('Error fetching notifications:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [page, hasMore])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (target.isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1)
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      },
    )

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current)
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current)
      }
    }
  }, [hasMore, loading])

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingBottom: '60px',
      }}
    >
      <Typography variant="h5" paddingLeft={1}>
        Notifications
      </Typography>

      {notifications.map((item) => (
        <NotificationItem key={item.id} notification={item} />
      ))}

      {loading && (
        <Typography variant="body2" align="center">
          Loading notifications...
        </Typography>
      )}

      {!hasMore && (
        <Typography variant="body2" align="center">
          No more notifications to load.
        </Typography>
      )}

      <div
        ref={sentinelRef}
        style={{
          height: '60px',
          width: '100%',
          backgroundColor: 'transparent',
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}
      ></div>
    </div>
  )
}

export default Notification
