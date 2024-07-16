import React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";  
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import OrderSelect from "../formComponents/OrderSelect";

export default function QuizForm() {
    const [numQuestions, setNumQuestions] = useState("5"); // Default to 5 questions
    const [selectedOrder, setSelectedOrder] = useState('');

    function handleNumQuestionsChange(event) {
        setNumQuestions(event.target.value);
    }

    function handleOrderChange(orderId) {
        setSelectedOrder(orderId);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log("Number of questions:", numQuestions);
        console.log("Selected order:", selectedOrder);
        // Add your form submission logic here
    }
    
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} align="center"> 
                <Typography variant="h4" component="h4">
                Create a Quiz
                </Typography>
            </Grid>
            <Grid item xs={12} align="center"> 
                <FormControl component="fieldset">
                <FormHelperText align="center">
                    Number of Questions
                </FormHelperText>
                <RadioGroup row value={numQuestions} onChange={handleNumQuestionsChange}>
                    <FormControlLabel value="5" control={<Radio />} label="5" />
                    <FormControlLabel value="10" control={<Radio />} label="10" />
                    <FormControlLabel value="15" control={<Radio />} label="15" />
                </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={6} align="left">
                <OrderSelect onChange={handleOrderChange} />
            </Grid>
            <Grid item xs={12} align="center">
                <Button onClick={handleSubmit} variant="contained" color="primary">
                Create Quiz
                </Button>
            </Grid>
        </Grid>
    )
}