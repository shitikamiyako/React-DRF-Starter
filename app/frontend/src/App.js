import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Box } from "@material-ui/core";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";
import Test from "./BookComponents/SearchBookContainer"
import Footer from "./SiteComponents/footer"
import config from './config';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQeazugmyXLs1c440zj-NNFg8nOFJww20",
  authDomain: "react-drf-starter.firebaseapp.com",
  projectId: "react-drf-starter",
  storageBucket: "react-drf-starter.appspot.com",
  messagingSenderId: "1000750098482",
  appId: "1:1000750098482:web:07b358cce9f40ad3e3b42b",
  measurementId: "G-GBWFZK4BHF"
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

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
            <footer>
              <Footer />
            </footer>
          </Box>
        </BrowserRouter>
      </ScopedCssBaseline>
    );
  }
}

// Material_uiはHookの形式でcssスタイルを定義できるのでそれを利用して再利用前提でコンポーネントを作ることができる
// 次はフォームを作るのでそれで練習する
