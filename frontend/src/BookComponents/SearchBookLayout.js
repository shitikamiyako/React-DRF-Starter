import React from "react";
import { Container } from "@material-ui/core";

import SearchBookForm from './SearchBookForm'

const SearchBookLayout = (props) => {
    return (
        <Container>{props.children}</Container>
    )

}

export default SearchBookLayout;