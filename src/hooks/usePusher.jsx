import { useEffect } from 'react';
import Pusher from 'pusher-js';
import { toast } from 'react-toastify';

const usePusher = (userId, setNotifications) => {
  useEffect(() => {
    // Connect to Pusher
    const pusher = new Pusher('64940ba62e7f545bd4c8', {
      cluster: 'ap2',
    });

    // Subscribe to user-specific channels
    const notificationChannel = pusher.subscribe(`notifications.${userId}`);
    const postChannel = pusher.subscribe(`post.${userId}`);

    // Handle notification events
    notificationChannel.bind('notification-event', (data) => {
      setNotifications((prev) => [...prev, data.message]);
      toast.info(`New notification: ${data.message}`);
    });

    // Handle like events
    postChannel.bind('like-post', (data) => {
      setNotifications((prev) => [...prev, `Likes updated: ${data.quantity}`]);
      toast.success(`Post liked: ${data.quantity} likes`);
    });

    // Handle comment events
    postChannel.bind('comment-post', (data) => {
      setNotifications((prev) => [...prev, `New comment: ${data.comment.description}`]);
      toast.success(`New comment: ${data.comment.description}`);
    });

    // Cleanup on unmount
    return () => {
      notificationChannel.unbind_all();
      notificationChannel.unsubscribe();
      postChannel.unbind_all();
      postChannel.unsubscribe();
    };
  }, [userId, setNotifications]);

  return null;  // This hook doesn't need to return anything
};

export default usePusher;
