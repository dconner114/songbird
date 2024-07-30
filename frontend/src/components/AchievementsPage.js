import React from "react";
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AchievementCard from './Achievements/AchievementCard';

export default function AchievementsPage() {

  const [achievements, setAchievements] = useState([]);

  // call achivements endpoint
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch('/api/achievements/');
        const data = await response.json();
        console.log(data);
        setAchievements(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchAchievements();
  }, []);

  return (
    <>
      <Typography variant="h3" component="h3">Achievements</Typography>
      <Container maxWidth="sm">
          <Box 
          component="section"
          display="flex" 
          gap={2}
          mx={2}
          flexDirection="row"
          >
          {achievements.map((achievement, index) => (
              <AchievementCard key={index} achievement={achievement}/>
          ))}
          </Box>
      </Container>
    </>
  );
}