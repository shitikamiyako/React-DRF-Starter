import React from "react";
import { Box, Typography } from '@material-ui/core';
import HomeComponentLayout from "./HomeComponentLayout"

const Landing = () => {
    return (
        <React.Fragment>
            <HomeComponentLayout>
                <Box>
                    <Typography>Landing Info</Typography>
                </Box>
            </HomeComponentLayout>
        </React.Fragment>
    )
}

export default Landing