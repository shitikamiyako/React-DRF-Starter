// 統括部分。Formの実行結果のレンダリング部分とフォームの処理部分をここに定義
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";

import { Grid } from "@material-ui/core";

import SearchBookForm from "./SearchBookForm";
import SearchBookLayout from "./SearchBookLayout";
import { GBAParams } from "../Utils/GoogleBooksAPIs";

const SearchBookContainer = () => {
  const [books, setBooks] = useState({ items: [] });

  const baseUrl = GBAParams.ROOT_URL;
  console.log(baseUrl);

  const searchTitle = async (data) => {
    const params = {
      // 完全一致で探したい
      q: `${GBAParams.QUERY_TITLE}"${data.title}"`,
      Country: "JP",
      maxResults: 40,
      startIndex: 0,
      printType: "books",
    };
    console.log(params);
    try {
      const response = await axios.get(baseUrl, { params: params });
      // const responseMap = response.data.map((obj) => {
      //     return obj;
      // })
      console.log(response.data.items);
      setBooks(response.data);
      console.log(books);
    } catch (error) {
      console.log(error.response);
    }
  };

  let BookList = books;
  console.log(books);
  // let BookList = Object.values(bookList);

  // useEffectを書く

  useEffect(() => {
    setBooks(books);
  }, [books]);

  return (
    <React.Fragment>
      <SearchBookLayout>
        <Grid container direction="row" justify="center">
          <SearchBookForm onSubmit={searchTitle} />
        </Grid>
        {/* ここに検索結果を一覧表示させる */}
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid container item xs={12} spacing={3}>
            {books.items.map((book, index) => (
              <Grid item xs={12} md={4} key={index}>
                <img
                  alt={`${book.volumeInfo.title} book`}
                  src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                />
                <h3>{book.volumeInfo.title}</h3>
                <p>{book.volumeInfo.publishedDate}</p>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </SearchBookLayout>
    </React.Fragment>
  );
};

// }

export default SearchBookContainer;
