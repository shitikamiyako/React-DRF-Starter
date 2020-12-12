import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { Container, Box } from "@material-ui/core";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";
import Test from "./BookComponents/SearchBookContainer"

// 全体のレイアウトを決める、とりあえず再利用は考えない
export default class App extends Component {
  render() {
    return (
      // CSSリセットのためのコンポーネント
      <ScopedCssBaseline>
        <BrowserRouter>
          {/* Box = div */}
          <Box className="app">
            <header></header>
            {/* コンテンツが入る部分 */}
            <Test />
            {/* <MainContent /> */}
            <footer></footer>
          </Box>
        </BrowserRouter>
      </ScopedCssBaseline>
    );
  }
}

// Material_uiはHookの形式でcssスタイルを定義できるのでそれを利用して再利用前提でコンポーネントを作ることができる
// 次はフォームを作るのでそれで練習する
