import React from "react";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

export default function QuizResults({ onReturn }) {
    return (
        <Container maxWidth="sm">
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