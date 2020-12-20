// 統括部分。Formの実行結果のレンダリング部分とフォームの処理部分をここに定義
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";


import { Grid, Box, Button } from "@material-ui/core";

import SearchBookForm from "./SearchBookForm";
import SearchBookLayout from "./SearchBookLayout";
import { GBAParams } from "../Utils/GoogleBooksAPIs";

const SearchBookContainer = () => {
  const [books, setBooks] = useState([]);
  const [defaultBooks, setDefaultBooks] = useState();
  const [filterFlag, setFilterFlag] = useState(false);
  const { control } = useForm();


  const baseUrl = GBAParams.ROOT_URL;
  console.log(baseUrl);


  const searchTitle = async (data) => {
    const params = {
      // 完全一致で探したい
      q: `${GBAParams.QUERY_TITLE}"${data.title}"`,
      filter: `paid-ebooks`,
      Country: "JP",
      maxResults: 40,
      startIndex: 0,
      printType: "books",
    };
    console.log(params);
    try {
      const response = await axios.get(baseUrl, { params: params });
      console.log(response.data.items);
      console.log(response.data);
      console.log(response);
      setBooks(response.data.items);
      setDefaultBooks(response.data.items);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleFilter = () => {
    if(!filterFlag) {
      // 期間限定試し読みなどを省く
      const filter_items = books.filter(
        (book) => book.volumeInfo.seriesInfo !== undefined
      )
      // 刊行順にソート
      const filtered_items = filter_items.sort(function(a, b) {
        if (a.volumeInfo.publishedDate < b.volumeInfo.publishedDate) {
          return -1;
        } else {
          return 1;
        }

      });

      console.log(filtered_items)
      setBooks(filtered_items)
      setFilterFlag(true)
    } else if(filterFlag === true) {
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
          <Grid container item xs={12} spacing={3}>
            {books.map((book, index) => (
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

export default SearchBookContainer;
