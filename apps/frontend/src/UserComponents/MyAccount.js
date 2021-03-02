import React from "react";
import { Box, Typography } from '@material-ui/core';
import UserComponentLayout from "./UserComponentLayout"

const MyAccount = () => {
    return(
        <React.Fragment>
            <UserComponentLayout>
                <Box>
                    <Typography>MyAccount Info</Typography>
                </Box>
            </UserComponentLayout>
        </React.Fragment>
    )
}

export default MyAccount