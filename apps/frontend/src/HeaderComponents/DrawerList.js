
import React from 'react';
import { makeStyles } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "react-router-dom";
// import ListItemIcon from '@material-ui/core/ListItemIcon';
const DrawerList = (Styles) => {

    const classes = Styles;

    return(
        <React.Fragment>
            <div className={classes.list}>
                <List>
                    <ListItem button component={Link} to="/Home">
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button component={Link} to="/">
                        <ListItemText primary="Test" />
                    </ListItem>
                    <ListItem button component={Link} to="/">
                        <ListItemText primary="Sample" />
                    </ListItem>
                    <ListItem button component={Link} to="/Search_Book">
                        <ListItemText primary="Search" />
                    </ListItem>
                </List>
            </div>
        </React.Fragment>
    )

}

export default DrawerList