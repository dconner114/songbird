import React from "react";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from "@mui/material/Typography";


export default function QuizResults({ onReturn, results }) {
    return (
        <Container maxWidth="sm">
            <Typography component="h1" variant="h5">
                Your Results
            </Typography>
            
            {results.map((result, index) => (
                <Accordion 
                    key={index}
                    sx={{
                        backgroundColor: result.isCorrect ? 'success.light' : 'error.light',
                        color: "white",
                    }}
                    {...(!result.isCorrect && {defaultExpanded: true})}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography>Question {index + 1}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>Correct Bird: {result.correct_bird.common_name}</Typography>
                        {!result.isCorrect && <Typography>Your Answer: {result.answer_bird.common_name}</Typography>}
                    </AccordionDetails>
                </Accordion>
            ))}
            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={onReturn}>
                Return to Quiz
            </Button>       
        </Container>
    )
}