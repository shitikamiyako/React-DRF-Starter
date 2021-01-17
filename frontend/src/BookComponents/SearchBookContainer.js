// 統括部分。Formの実行結果のレンダリング部分とフォームの処理部分をここに定義
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

import { Grid, Box } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import { makeStyles } from '@material-ui/core/styles';

import SearchBookForm from "./SearchBookForm";
import SearchBookLayout from "./SearchBookLayout";
import { GBAParams } from "../Utils/GoogleBooksAPIs";

// スタイル
// const useStyles = makeStyles((theme) => ({
//   root: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 0,
//     paddingTop: '56.25%', // 16:9
//   },
//   expand: {
//     transform: 'rotate(0deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//       duration: theme.transitions.duration.shortest,
//     }),
//   },
//   expandOpen: {
//     transform: 'rotate(180deg)',
//   },
// }));

const SearchBookContainer = () => {
  const [books, setBooks] = useState([]);
  const [defaultBooks, setDefaultBooks] = useState(false);
  const [filterFlag, setFilterFlag] = useState(false);
  const { control } = useForm();
  // const classes = useStyles();

  const baseUrl = GBAParams.ROOT_URL;
  console.log(baseUrl);


  const searchTitle = async (data) => {
    const params = {
      // 完全一致で探したい
      q: `${GBAParams.QUERY_TITLE}${data.title}`,
      // filter: `paid-ebooks`,
      Country: "JP",
      maxResults: 40,
      orderBy: "newest",
      // startIndex: 0,
      printType: "books",
    };
    console.log(params);
    try {
      const response = await axios.get(baseUrl, { params: params });
      console.log(response.data.items);
      console.log(response.data);
      console.log(response);
      // 期間限定試し読みなどを省く
      // const filter_items = response.data.items.filter(
      //   (book) => book.volumeInfo.seriesInfo !== undefined
      // )
      // console.log(filter_items)
      const filter_items = response.data.items
      // 刊行順にソート
      const filtered_items = filter_items.sort(function (a, b) {
        if (a.volumeInfo.publishedDate < b.volumeInfo.publishedDate) {
          return -1;
        } else {
          return 1;
        }

      });
      // 最終的に描画する部分
      setBooks(filtered_items)
      setDefaultBooks(filtered_items);
      // const test1 = Object.keys(filtered_items).forEach((key) => {
      //   filtered_items[key].clicked = false;
      // })
      // for(let count = 0; count<filtered_items.length; count++) {
      //   clicked.push( { id:count+1, like:false} )
      // }
    } catch (error) {
      console.log(error.response);
    }
  };


  const handleFilter = () => {
    if (!filterFlag) {
      // 期間限定試し読みなどを省く
      const filter_items = books.filter(
        (book) => book.volumeInfo.seriesInfo !== undefined
      )
      // 刊行順にソート
      const filtered_items = filter_items.sort(function (a, b) {
        if (a.volumeInfo.publishedDate < b.volumeInfo.publishedDate) {
          return -1;
        } else {
          return 1;
        }

      });
      console.log(filtered_items)
      setBooks(filtered_items)
      setFilterFlag(true)
    } else if (filterFlag === true) {
      setBooks(defaultBooks)
      setFilterFlag(false)
    }

  }


  // useEffectを書く

  useEffect(() => {
    setBooks(books);

  }, [books]);

  console.log(books)
  console.log(defaultBooks)
  console.log(filterFlag)



  return (
    <React.Fragment>
      <SearchBookLayout>
        <Box mb={4}>
          <Grid container direction="row" justify="center">
            <SearchBookForm onSubmit={searchTitle} onFilter={handleFilter} />
          </Grid>
        </Box>
        {/* ここに検索結果を一覧表示させる */}
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid container item  xs={12} spacing={1}>
            {books.map((book, index) => (
              <Grid item xs={6} md={4} align="center" key={index}>
                    <img
                      alt={`${book.volumeInfo.title} book`}
                      src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                    />
                <h3>{book.volumeInfo.title}</h3>
                <p>{book.volumeInfo.authors[0]}</p>
                <p>{book.volumeInfo.authors[1]}</p>
                <p>発売日：{book.volumeInfo.publishedDate}</p>
                <p><a href={book.volumeInfo.infoLink}>購入ページへ</a></p>
                <p><a href={book.volumeInfo.previewLink}>試し読み</a></p>
                {/* いいねボタン、バックエンドと非同期しないと使えないのでダミーでおいておく */}
                <IconButton onClick={()=> console.log}>
                  {/* {like ? <FavoriteIcon color="secondary" /> : <FavoriteIcon color="disabled" /> } */}
                </IconButton>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </SearchBookLayout>
    </React.Fragment>
  );
};

export default SearchBookContainer;
