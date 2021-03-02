import React from 'react';
import { useForm, Controller } from "react-hook-form";
import {
    TextField,
    Button,
    Grid,
    Box,
    Typography,
} from "@material-ui/core";

const LogoutForm = (onSubmit) => {

    return(
        <React.Fragment>
            <Grid item xs={12}>
                <Box mt={1} textAlign="center">
                    <Typography variant="h3">Would you like to logout?</Typography>
                    <Button
                        color="secondary"
                        variant="outlined"
                        type="submit"
                        onClick={
                            onSubmit
                        }
                        >
                        Logout
                    </Button>
                </Box>
            </Grid>
        </React.Fragment>
    )
}

export default LogoutForm