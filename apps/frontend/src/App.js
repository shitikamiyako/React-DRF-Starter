import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Box } from "@material-ui/core";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";
import Test from "./BookComponents/SearchBookContainer"
import Test2 from "./AuthComponents/TestFirebaseAuthContainer"
import Footer from "./FooterComponents/footer"
import Header from "./HeaderComponents/AppBar"
// 全体のレイアウトを決める、とりあえず再利用は考えない
export default class App extends Component {

  render() {
    return (
      <React.Fragment>
        {/* CSSリセットのためのコンポーネント */}
        <ScopedCssBaseline>
          <BrowserRouter>
            {/* Box = div */}
            <Box className="app">
              <header>
                <Header />
              </header>
              {/* コンテンツが入る部分 */}
              <Test2 />
              {/* <Test /> */}
              {/* <MainContent /> */}
              <footer>
                <Footer />
              </footer>
            </Box>
          </BrowserRouter>
        </ScopedCssBaseline>
      </React.Fragment>
    );
  }
}

// Material_uiはHookの形式でcssスタイルを定義できるのでそれを利用して再利用前提でコンポーネントを作ることができる
// 次はフォームを作るのでそれで練習する
