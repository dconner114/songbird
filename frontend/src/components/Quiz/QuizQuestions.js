import React from "react";
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Question from './Question';

export default function QuizQuestions({ questions , onQuizSubmit }) {
    const [choices, setChoices] = useState(Array(questions.length).fill(null));
    const [correctAnswers, setCorrectAnswers] = useState([]);

    // keep track of the correct answers when quiz is generated
    useEffect(() => {
        const answers = questions.map((question) => question.correct_answer.id);
        setCorrectAnswers(answers);
    }, [questions]);

    const handleChoiceChange = (choice, index) => {
        setChoices(prevChoices => {
            const newChoices = [...prevChoices];
            newChoices[index] = choice;
            return newChoices;
        });
    };

    const handleSubmit = (event) => {
        console.log({ correctAnswers, choices });
        event.preventDefault();
        onQuizSubmit({ correctAnswers, choices });
    };

    return (
    <Container maxWidth="sm">
        <Box 
        component="section"
        display="flex" 
        gap={2}
        mx={2}
        flexDirection="column"
        >
        {questions.map((question, index) => (
            <Question handleChoiceChange={handleChoiceChange} key={index} question={question} index={index} />
        ))}
        </Box>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
        >
            Submit
        </Button>
    </Container>
  );
}