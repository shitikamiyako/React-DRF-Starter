import React from "react";
import { useState, useEffect } from "react";
import GoogleFont from "react-google-font-loader";
import { makeStyles } from "@material-ui/core/styles";


import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import InfoIcon from '@material-ui/icons/Info';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Popover,
  Link,
  IconButton,
  Menu,
  MenuItem
} from "@material-ui/core";

// import Menu from 'material-ui-popup-state/HoverMenu'
// import Popover from 'material-ui-popup-state/HoverPopover'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

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

  // DBと通信するための関数。とりあえず仮置
  const saveBookTest = () => {
    // 本当はStateに格納してそれでどうこうしたいけど遅延の関係でうまく行かない
    // なのでとりあえず引数で渡されたデータをそのまま使う、あとでチューニングするならする。
    const params = {
      title: Data.title,
      // 一度配列で渡してサーバーサイド側で文字列変換して保存してもらう。取り出すときは逆のことをする。
      authors: Data.authors,
      publish: Data.publisher,
      publishedDate: Data.publishedDate,
      infoLink: Data.infoLink,
      previewLink: Data.previewLink,
    };
    setItem(Data)
    console.log(params);
  };

  const open = Boolean(anchorEl);

  return (
    <>
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
          <CardActionArea
            className={classes.actionArea}
            {...bindTrigger(popupState)}
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
              </CardContent>
            </Card>
          </CardActionArea>
            <Menu
            {...bindMenu(popupState)}
              // nullにしておかないとエラー
              getContentAnchorEl={null}
              // メニューの位置
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              // ポインタが離れたら閉じる
              onMouseLeave={popupState.close}

            >
              <IconButton
              aria-owns={open ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
              >
                <InfoIcon color="primary" />
              </IconButton>
              <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                  paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <Typography>
                  {Data.publisher}
                </Typography>
                <Typography>
                  {Data.publishedDate}
                </Typography>
              </Popover>
              <IconButton onClick={popupState.close}>
                <Link href={Data.infoLink}>
                  <ShoppingCartIcon color="primary" />
                </Link>
              </IconButton>
              <IconButton onClick={popupState.close}>
                <Link href={Data.previewLink}>
                  <MenuBookIcon color="primary" />
                </Link>
              </IconButton>
              <IconButton onClick={
                () => {
                  saveBookTest()
                  popupState.close()
                }
                }>
                  <LibraryAddIcon color="primary" />
              </IconButton>
            </Menu>
        </>
        )}
      </PopupState>
    </>
  );
};

export default CustomCard;
