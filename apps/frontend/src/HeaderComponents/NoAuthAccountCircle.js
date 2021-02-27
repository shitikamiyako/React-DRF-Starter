import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link } from "react-router-dom";

const NoAuthAccountCircle = (handleMenu, anchorEl, handleClose ) => {
    const open = Boolean(anchorEl);

    return (
        <React.Fragment>
            <div>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem component={Link} to="/" onClick={handleClose}>Login</MenuItem>
                    <MenuItem component={Link} to="/" onClick={handleClose}>Register</MenuItem>
                </Menu>
            </div>
        </React.Fragment>
    )
}

export default NoAuthAccountCircle