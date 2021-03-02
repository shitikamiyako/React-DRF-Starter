import React from "react";
import { Container } from "@material-ui/core";

const HomeComponentLayout = (props) => {
    return (
        <Container>{props.children}</Container>
    )
}

export default HomeComponentLayout