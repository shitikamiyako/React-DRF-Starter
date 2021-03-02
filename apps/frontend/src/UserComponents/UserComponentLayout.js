import React from "react";
import { Container } from "@material-ui/core";

const UserComponentLayout = (props) => {
    return (
        <Container>{props.children}</Container>
    )
}

export default UserComponentLayout