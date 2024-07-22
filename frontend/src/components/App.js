import React from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import HomePage from "./HomePage";
import QuizPage from "./QuizPage";
import ProfilePage from "./ProfilePage";
import { useState } from "react";

export default function App() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
      setSelectedTab(newValue);
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={selectedTab}
        onChange={handleTabChange}
      >
        <Tab label="Home" />
        <Tab label="Learn" />
        <Tab label="Profile" />
      </Tabs>
      <div style={{ marginLeft: '20px' }}>
        {selectedTab === 0 && (
          <>
            <Typography variant="h3">Home</Typography>
            <HomePage />
          </>
        )}
        {selectedTab === 1 && (
          <>
            <Typography variant="h3">Learn</Typography>
            <QuizPage />
          </>
        )}
        {selectedTab === 2 && (
          <>
            <ProfilePage />
          </>
        )}
      </div>
    </div>
  );
}