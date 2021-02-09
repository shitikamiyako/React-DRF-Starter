// 統括部分。Formの実行結果のレンダリング部分とフォームの処理部分をここに定義
import React from "react";
import { useState } from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Color from 'color';
import { Grid, Box } from "@material-ui/core";

import SearchBookForm from "./SearchBookForm";
import SearchBookLayout from "./SearchBookLayout";
import CustomCard from "../contents/CustomCard"
import { GBAParams } from "../Utils/GoogleBooksAPIs";

const useStyles  = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
  // CardをButtonにしているのでその部分のスタイル
  actionArea: {
    // 幅をCardと合わせる
    maxWidth: 300,
    // カード間隔の調整
    marginBottom: 40,
    borderRadius: 16,
    // アニメーションの速度
    transition: '0.2s',
    '&:hover': {
      // hoverで大きさを拡大、boxShadowはmaxWidthを設定しているの拡大しない
      transform: 'scale(1.1)',
    },
  },
  // カード部分のスタイル
  card: ({ color }) => ({
    // APIから読み込んだサムネイルデータに応じてうまく調整
    minWidth: 256,
    maxWidth: 300,
    maxheight: 300,
    borderRadius: 16,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: `0 6px 12px 0 ${Color(color)
        .rotate(-12)
        .darken(0.2)
        .fade(0.5)}`,
    },
  }),
  content: ({ color }) => {
    return {
      backgroundColor: color,
      // padding: '1rem 1.5rem 1.5rem',
    };
  },
  title: {
    fontFamily: 'Keania One',
    fontSize: '1.2rem',
    color: '#fff',
    justifyContent: 'center',
    overflowWrap: 'break-word',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontFamily: 'Montserrat',
    color: '#fff',
    opacity: 0.87,
    marginTop: '2rem',
    fontWeight: 500,
    fontSize: 14,
  },
  media: {
    // src属性を使う(APIから取得した画像データを使う)場合はheightかpaddingTopの指定を行わないと出力されない
    paddingTop: '110.25%',
    objectFit: 'cover'
  }
}));


const SearchBookContainer = () => {
  const [books, setBooks] = useState([]);
  const [defaultBooks, setDefaultBooks] = useState([]);
  const [filterFlag, setFilterFlag] = useState(false);
  // const classes = useStyles();

  const baseUrl = GBAParams.ROOT_URL;
  const styles = useStyles({ color: '#ff9900' })
  console.log("render");

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
    // console.log(params);
    try {
      const response = await axios.get(baseUrl, { params: params });
      console.log(response.data.items);
      const filter_items = response.data.items;
      // 刊行順にソート
      const filtered_items = filter_items.sort(function (a, b) {
        if (a.volumeInfo.publishedDate < b.volumeInfo.publishedDate) {
          return -1;
        } else {
          return 1;
        }
      });
      // 最終的に描画する部分
      setBooks(filtered_items);
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
      );
      // 刊行順にソート
      const filtered_items = filter_items.sort(function (a, b) {
        if (a.volumeInfo.publishedDate < b.volumeInfo.publishedDate) {
          return -1;
        } else {
          return 1;
        }
      });
      // console.log(filtered_items)
      setBooks(filtered_items);
      setFilterFlag(true);
    } else if (filterFlag === true) {
      setBooks(defaultBooks);
      setFilterFlag(false);
    }
  };

  // const handleClick = (e) => {
  //   e.preventDefault();
  // };

  // const saveBookTest = (data) => {
  //   console.log(data)

  // }




  // console.log(books)
  // console.log(defaultBooks)


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
          <Grid container item xs={12} spacing={1}>
            {books.map((book, index) => (
              <Grid item xs={12} sm={6} md={4}  align="center" key={index}>
                <CustomCard classes={styles}
                alt={`${book.volumeInfo.title} book`}
                src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                Data={book.volumeInfo}
                index={index}
                />
                {/* <img
                  alt={`${book.volumeInfo.title} book`}
                  src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                /> */}
                {/* <h3>{book.volumeInfo.title}</h3> */}
                {/* 原作と作画で担当が分かれていたりする場合があるのでこの部分だけ再度map()を使いたい */}
                {/* 加えてauthorsが未定義の場合もあるので、jsx内でif文を書く必要がある */}
                {/* 結果、book.volumeInfo.authors !== undefinedの場合&&以下を返す */}
                {/* {book.volumeInfo.authors &&
                  book.volumeInfo.authors.map((author, index) => (
                    <p key={index}>{author}</p>
                  ))}
                <p>発売日：{book.volumeInfo.publishedDate}</p>
                <p>
                  <a href={book.volumeInfo.infoLink}>購入ページへ</a>
                </p>
                <p>
                  <a href={book.volumeInfo.previewLink}>試し読み</a>
                </p> */}
                {/* いいねボタン、バックエンドと非同期しないと使えないのでダミーでおいておく */}
                {/* <IconButton onClick={() => console.log}> */}
                  {/* {like ? <FavoriteIcon color="secondary" /> : <FavoriteIcon color="disabled" /> } */}
                  {/* <FavoriteIcon color="secondary" /> */}
                {/* </IconButton> */}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </SearchBookLayout>
    </React.Fragment>
  );
};

export default SearchBookContainer;
