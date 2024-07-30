import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from "@mui/material";

export default function AchievementCard({ achievement }) {
    return (
        <Card 
            key={achievement.id}
            sx={{
                backgroundColor: achievement.isEarned ? 'success.light' : 'secondary.light',
                color: "white",
            }}
            >
            <CardContent>
                <Typography variant="h6" color="grey">
                        {achievement.name}
                    </Typography>
                <Typography variant="subtitle1" color="grey">
                    {achievement.description}
                </Typography>
            </CardContent>
        </Card>
    )
}
