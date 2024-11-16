import { useState, useEffect } from 'react';
import axios from 'axios';

export const useUserProfile = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('access_token'));

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}/api/auth/user-profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    if (token) {
      getUser();
    }
  }, [token]);
  return { user, token, setToken };
};
