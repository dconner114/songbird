import React from "react";
import axios from 'axios';
import { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

export default function ProfilePage(props) {

  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/user-info/');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUser();
  }, []);

  if (!user) {
    <CircularProgress />
  } else {
    return (
      <>
        <Typography variant="h6">{user.username}'s Profile</Typography>
        <Typography variant="subtitle1">Quizzes Taken: {user.quizzes_taken}</Typography>
        <Typography variant="subtitle1">Your email: {user.email}</Typography>
      </>
    );
  }
}