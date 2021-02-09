import React from "react";
import { Container } from "@material-ui/core";

const SearchBookLayout = (props) => {
    return (
        <Container>{props.children}</Container>
    )

}

export default SearchBookLayout;