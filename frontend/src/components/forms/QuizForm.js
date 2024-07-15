import React from "react";
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
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} align="center"> 
                <Typography variant="h4" component="h4">
                Create a Quiz
                </Typography>
            </Grid>
            <Grid item xs={12} align="center"> 
                <FormControl component="fieldset">
                <FormHelperText>
                    <div align="center">
                    Number of Questions
                    </div>
                </FormHelperText>
                <RadioGroup row defaultValue="5">
                    <FormControlLabel value="5" control={<Radio />} label="5" />
                    <FormControlLabel value="10" control={<Radio />} label="10" />
                    <FormControlLabel value="15" control={<Radio />} label="15" />
                </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={6} align="left">
                <OrderSelect />
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant="contained" color="primary">
                Create Quiz
                </Button>
            </Grid>
        </Grid>
    )
}