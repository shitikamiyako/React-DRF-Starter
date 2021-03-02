import React from "react";
import { Box, Typography } from '@material-ui/core';
import UserComponentLayout from "./UserComponentLayout"

const Profile = () => {
    return (
        <React.Fragment>
            <UserComponentLayout>
                <Box>
                    <Typography>Profile Info</Typography>
                </Box>
            </UserComponentLayout>
        </React.Fragment>
    )
}
export default Profile