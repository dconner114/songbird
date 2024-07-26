import React from "react";
import { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

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
                    <Typography variant="h4">
                        {question.correct_answer.common_name}
                    </Typography>
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