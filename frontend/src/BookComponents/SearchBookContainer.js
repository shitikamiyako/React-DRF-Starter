// 統括部分。Formの実行結果のレンダリング部分とフォームの処理部分をここに定義
import React from "react";
import { useState, useEffect } from "react"
import axios from "axios";
import _ from "lodash";

import { Grid } from "@material-ui/core";


import SearchBookForm from './SearchBookForm'
import SearchBookLayout from './SearchBookLayout'
import { GBAParams } from '../Utils/GoogleBooksAPIs'

const SearchBookContainer = () => {

    const [bookList, setBookList] = useState()

    const baseUrl = GBAParams.ROOT_URL

    const searchTitle = async(data) => {
        const params = {
            // 完全一致で探したい
            q: `${GBAParams.QUERY_TITLE}"${data.title}"`,
            Country: "JP",
            maxResults: 40,
            startIndex: 0,
            printType: "books",
        }

        try {
            const response = await axios.get(baseUrl, { params: params });
            // const responseMap = response.data.results.map((obj) => {
            //     return obj;
            // })

            setBookList(response)
        } catch(error) {
            console.log(error.response)
        }

    }

    let BookList = bookList
    // let BookList = Object.values(bookList);

    // useEffectを書く

    return (
        <React.Fragment>
            <SearchBookLayout>
                <Grid direction="row" justify="center" xs={12}>
                    <SearchBookForm onSubmit={searchTitle}/>
                </Grid>
                {/* ここに検索結果を一覧表示させる */}
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid container item xs={12} spacing={1}>
                        {BookList.map((book) => (
                            <Grid items xs={12} md={4} spacing={3} key={book.id}>
                                <p>{book.title}</p>
                            </Grid>
                        ))}
                    </Grid>

                </Grid>
            </SearchBookLayout>
        </React.Fragment>
    )

}

export default SearchBookContainer;