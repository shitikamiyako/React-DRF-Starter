import React from "react";
import { useState, useEffect } from "react";
import GoogleFont from "react-google-font-loader";
import { makeStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuBookIcon from "@material-ui/icons/MenuBook";

import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Popover,
  Link,
IconButton,
} from "@material-ui/core";

const CustomCard = ({
  classes,
  alt,
  src,
  title,
  authors,
  publish,
  publishedDate,
  infoLink,
  previewLink,
  Data,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [item, setItem] = useState({});

  const handleClick = (e) => {
    e.preventDefault();
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const saveBookTest = () => {
    setItem(Data)
    const params = {
      title: item.title,
      // 一度配列で渡してサーバーサイド側で文字列変換して保存してもらう。取り出すときは逆のことをする。
      authors: item.authors,
      publish: item.publisher,
      publishedDate: item.publishedDate,
      infoLink: item.infoLink,
      previewLink: item.previewLink,
    }
    console.log(params)
  }

  const open = Boolean(anchorEl);

  return (
    <>
      <CardActionArea
        className={classes.actionArea}
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onClick={() => {
          saveBookTest()
        }}
      >
        <Card className={classes.card}>
          <CardMedia className={classes.media} alt={alt} image={src} />
          <CardContent className={classes.content}>
            <Typography className={classes.title} noWrap={true}>
              {Data.title}
            </Typography>
            {Data.authors &&
              Data.authors.map((author, index) => (
                <Typography key={index} className={classes.authorStyle}>
                  {author}
                </Typography>
              ))}
            <IconButton>
              <Link href={Data.infoLink}>
                <ShoppingCartIcon color="primary" />
              </Link>
            </IconButton>
            <IconButton>
              <Link href={Data.previewLink}>
                <MenuBookIcon color="primary" />
              </Link>
            </IconButton>
          </CardContent>
        </Card>
      </CardActionArea>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography className={classes.publish}>出版:{Data.publisher}</Typography>
        <Typography className={classes.publish}>
          発売日:{Data.publishedDate}
        </Typography>
      </Popover>
    </>
  );
};

export default CustomCard;
