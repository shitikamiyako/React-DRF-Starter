import React from "react";
import { Box, Typography } from '@material-ui/core';
import HomeComponentLayout from "./HomeComponentLayout"

const Home = () => {
    return (
        <React.Fragment>
            <HomeComponentLayout>
                <Box>
                    <Typography>Home Info</Typography>
                </Box>
            </HomeComponentLayout>
        </React.Fragment>
    )
}

export default Home