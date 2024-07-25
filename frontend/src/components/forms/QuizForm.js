import React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import OrderSelect from "../formComponents/OrderSelect";

export default function QuizForm({ onQuizStart }) {
    const [formData, setFormData] = useState({ 
        numQuestions: "5", 
        order: "" 
    }); 

    function handleNumQuestionsChange(event) {
        setFormData({ ...formData, numQuestions: event.target.value });
    }

    function handleOrderChange(selectedOrder) {
        setFormData({ ...formData, order: selectedOrder });
    }

    function handleSubmit(event) {
        event.preventDefault();
        onQuizStart(formData);
        // Add your form submission logic here
    }
    
    return (
        <Container component="main" maxWidth="s">
            <Box
                sx={{
                marginTop: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                Create a Quiz
                </Typography>
                <FormControl>
                    <FormLabel id="number-of-questions-label">Number of Questions</FormLabel>
                    <RadioGroup aria-labelledby="number-of-questions-label" value={formData.numQuestions} onChange={handleNumQuestionsChange}>
                        <FormControlLabel value="5" control={<Radio />} label="5" />
                        <FormControlLabel value="10" control={<Radio />} label="10" />
                    </RadioGroup>
                </FormControl>
                <OrderSelect onOrderChange={handleOrderChange} />
                <Button onClick={handleSubmit} variant="contained" color="primary">
                Create Quiz
                </Button>
            </Box>
        </Container>
    )
}