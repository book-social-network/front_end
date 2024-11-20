import React, { useEffect,useState } from 'react'
import AuthorizationAxios from '../hooks/Request'
import { data } from 'autoprefixer'

export default function Testpage() {
    const [suggestedFriends, setSuggestedFriends] = useState(null);
    const token = localStorage.getItem('access_token'); // Lấy token từ localStorage

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await AuthorizationAxios.get('/api/follow/suggest-friends');
                setSuggestedFriends(res); // Lưu dữ liệu vào state
                console.log('Fetched data:', res);
            } catch (error) {
                console.error('Failed to fetch suggested friends:', error); // Log lỗi nếu có
            }
        };
        fetchData();
    }, []);
  return (
    <div>{token}</div>
  )
}
