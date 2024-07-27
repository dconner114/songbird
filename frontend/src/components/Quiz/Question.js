import React from "react";
import { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Question({ question, index, handleChoiceChange}) {

    const [ choice, setChoice ] = useState(null);

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setChoice(selectedValue);
        handleChoiceChange(selectedValue, index);
    };

    return (
        <Card 
            key={index}
            >
                <CardContent>
                    <Typography variant="h6" color="grey">
                        Question {index + 1}
                    </Typography>
                    {question.correct_answer.photo ? 
                        <img src={question.correct_answer.photo} alt="Bird photo" style={{width: '100%', height: 'auto'}} /> 
                        : question.correct_answer.common_name}

                    <RadioGroup
                        value={choice}
                        onChange={handleChange}
                    >
                        {question.choices.map((choice, index) => (
                            <FormControlLabel 
                            control={<Radio />} 
                            key={index} 
                            label={choice.common_name}
                            value={parseInt(choice.id)}/>
                        ))}
                    </RadioGroup>
                </CardContent>
            </Card>
    )
}