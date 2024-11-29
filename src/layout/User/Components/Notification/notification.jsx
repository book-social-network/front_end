import React, { useEffect, useState, useRef } from 'react'
import NotificationItem from './notification-item'
import { Typography } from '@mui/material'
import AuthorizationAxios from '../../../../hooks/Request'

const Notification = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1) // Trang hiện tại
  const [hasMore, setHasMore] = useState(true) // Có tiếp tục tải không

  const sentinelRef = useRef(null) // Tham chiếu đến phần tử sentinel

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!hasMore) return

      try {
        setLoading(true)
        const response = await AuthorizationAxios.get(
          `/api/notification/get-all?page=${page}`,
        )
        const { notifications: newNotifications, quantity_pages } = response.data

        setNotifications((prev) => [...prev, ...newNotifications])

        // Nếu đã tải hết các trang, dừng tải thêm
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
          setPage((prev) => prev + 1) // Tăng trang khi sentinel vào viewport
        }
      },
      {
        root: null, // Quan sát viewport mặc định
        rootMargin: '0px',
        threshold: 1.0, // Kích hoạt khi sentinel hoàn toàn trong viewport
      }
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
    <div style={{ position: 'relative', minHeight: '100vh', paddingBottom: '60px' }}>
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

      {/* Sentinel nằm ở dưới cùng */}
      <div
        ref={sentinelRef}
        style={{
          height: '60px', // Đảm bảo chiều cao để giữ sentinel hoạt động
          width: '100%',
          backgroundColor: 'transparent', // Màu nền trong suốt
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}
      ></div>
    </div>
  )
}

export default Notification
