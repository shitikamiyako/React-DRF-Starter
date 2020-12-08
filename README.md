# React + DRF + Firebase でアプリを作成する際の覚え書き

## はじめに

先日

[未経験からweb系エンジニアになるための独学履歴 React+DRF+HerokuでTodoアプリを作る 製作記録](https://qiita.com/shitikakei/items/b69a8805c6f9015ac5e4)

という記事を書きました。
現在これを元に就職活動をしていますが、それはそれとして今回React+DRFでアプリを作ってみたはいいものの、チュートリアルを終えてすぐに制作にかかったため逐次調べながらの作業となって、
進行がイマイチであったのともっと最適化できることもあっただろうなというものを感じていました。
そもそも、React + DRFでの制作は割とニッチなものらしくまとまった情報もなく私自身苦労したので、もし後続の方に同じ構成で制作される方がいた場合はその際の道標に(ググる際の助けに)なれればというのと、私もこれからこの2つのスキルの練度を上げていきたいと思っているので知識を整理して、定着させるという意味でも今回この記事を書いてみようかと思います。
Firebaseに関しては上記の記事では採用していませんでしたが、作ってみて認証はめんどくさい(フロント+Djnagoだとさらに)と感じたのでならばこちらに任せるほうが堅いと感じたので一緒に見ていこうとおもいます。

## 0. 最低限押さえておくこと

- React及びReact Hooksの公式チュートリアル
- Djangoの公式チュートリアル

以上はやってある前提で話をしています。


## 1. Pipenvで環境の準備

何はともあれまずは環境の構築です。
今回はDjangoのテンプレートにReactを読み込ませる形で作成するのでとりあえずDjangoをスタートさせます。

```python

pipenv --python バージョン

```

これで任意のPythonnのバージョン指定して環境を初期化して立ち上げる。
Pipenvって何？ というところからスタートの方は以下の記事が大変わかりやすいので一読をおすすめします。
[Pipenvを使ったPython開発まとめ](https://qiita.com/y-tsutsu/items/54c10e0b2c6b565c887a)

続いて構築した環境にDjangoとDRFを入れていきます。

```python

pipenv install django djangorestframework

pipenv run django-admin startproject config

```

`startproject`のあとは任意の名前で構いませんが、settings.py他プロジェクトの大本の設定を担うフォルダになるのでそれとわかるようなものにするのがよろしいそうです。

## 2. frontendフォルダ作成・React導入

まずは新規アプリフォルダを立ち上げます、Reactがここに入るのでフォルダ名はそれとわかるようなものがいいでしょう

```python

pipenv run django-admin startapp frontend

```

frontendフォルダにReactを導入します。

```terminal

# 初期化、つまりはnode_modulesをカレントディレクトリに入れる。これをやらないと以下のコマンドを実行できない。
yarn init
yarn global add create-react-app
create-react-app

```

npmでやる場合は`npm install create-react-app`などでできると思いますが、公式では`npx create-react-app`で紹介されているのでそちらでできるように準備するのが良いかと思います。

例としては

```

# 初期化、つまりはnode_modulesをカレントディレクトリに入れる。これをやらないと以下のコマンドを実行できない。
npm init

npx create-react-app my-react-app --use-npm
npm init react-app my-react-app --use-npm
yarn create react-app my-react-app --use-npm

```

といった3つのコマンドがあります、いずれも導入はnpmじゃなくてyarnでもnpmを使うように設定するコマンドです。
導入できたらまずpackage.jsonのScriptsのところにに以下の項目を追記します。

```jsx

"scripts": {
    # 以下の2項目を追加
  "dev": "webpack --mode development ./src/index.js --output-path ./static/frontend/main.js",
  "build": "webpack --mode production ./src/index.js --output-path ./static/frontend/main.js"
}

```

次にbabelというものを入れます。
開発のときにはいらなかったのですが、デプロイするときにこれとこれに関する設定がないと詰むので入れておきましょう。

```jsx

yarn add @babel/core babel-loader @babel/preset-env @babel/preset-react --dev

# npmの場合
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev

```

設定はとりあえず以下のように。

```jsx

# デフォルトはこれ
{
    "presets": [
        "@babel/preset-env", "@babel/preset-react"
    ]
}

# herokuに上げるときはこのように書かないとうまくいかなかった

{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "node": true
                }
            }
        ],
        "@babel/preset-react"
    ]
}

```

次にReact関連のモジュールを入れます、ただ`create-react-app`した場合はいらないみたいです。

```jsx

yarn add react react-dom --dev
npm i react react-dom --save-dev

```

あとはwebpackについての設定を作ればひとまずおしまいです。

```jsx

const MomentLocalesPlugin = require("moment-locales-webpack-plugin");

module.exports = {
  entry: {
    frontend: "./src/index.js",
  },
  plugins: [
    // To strip all locales except “en”
    new MomentLocalesPlugin(),

    // Or: To strip all locales except “en”, “es-us” and “ru”
    // (“en” is built into Moment and can’t be removed)
    new MomentLocalesPlugin({
      localesToKeep: ["es-us", "ja"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};


```

少し調べてみると`create-react-app`は手軽にReactを導入するためのコマンドではあるが、細かいところの設定はあまり考慮されていないということみたいです。
つまるところここまでやってきたことは`create-react-app`に頼らずにReactを導入するための手順のいくつかということになり、
デプロイする場合はbabelrcやwebpack.config.jsを適宜自分で書かないといけないということです、ここが難しい……別途また勉強が必要ですね。
ともあれ、デプロイせず単なるlocalでReactを触るというだけなら`create-react-app`だけでも大丈夫なので安心してください。
さて、これでReactは導入できたのでまずはReactから触っていこうと思います。

## 2. React Hooksでフロント部分を作る

Reactは最近Hooksというものにシフトしているようです、詳しくは公式のチュートリアルをどうぞ。
ポートフォリオを作ったときはチュートリアルを終えて見様見真似、わからなくなったらググって調べて……を繰り返していたので、今回は自分で実際にそうやって使ってみたのをフィードバックして改めてまとめていきたいと思います。
例として簡単な書籍検索アプリを作りながら見ていきたいと思いますが作業を始める前に実際にReactで作成したあとに、いくつか意識しておくべきだったなぁと感じたことを書かせていただきます。
不要な場合は読み飛ばしてもらって構いません。

### 2.1 Reactアプリの設計

**この項目で理解しておきたいこと**

- Reactは親から子へstateに格納したアレコレ(props)渡して色々やるもの。
- stateは基本的にコンポーネント内だけでの存在で`、他のコンポーネントと共有したり参照することはできない。
- Reactはコンポーネントという単位でページをパーツに分割することができる。

実際にチュートリアルを終えて曲がりなりにもReactを使ってアプリを作ってまず思ったことはおそらくReact等のフロントエンドのフレームワークは最初にしっかりある程度設計に目処を立てる必要があるということです。
まあこれは当然のことで、実際の開発で設計をおざなりにするなんてありえませんが私達のようなチュートリアルやってじゃあ実践的になにかやってみようという段階だと設計なんてしっかりできるわけがないので、そういうときに直面する問題でもあります。

というのもチュートリアルをやればわかりますがReactは親から子へstateに格納したアレコレ(props)渡して色々やるという技術です。
ということはstateは基本的にコンポーネント内だけでの存在で、他のコンポーネントと共有はできないということです。
それと同時にReactはコンポーネントという単位でページをパーツに分割することができます。
例えばタスクを一覧表示させるページを作るにも

- 全体のレイアウトを司るコンポーネント
- タスクを検索したり、タスクを追加するためのFormを司るコンポーネント
- タスクを一覧表示部分を司るコンポーネント

……と最低でも3つのコンポーネントから作ることができます、もっと細部に分割するなんていう例もあるでしょう。
これはコンポーネント自体がうまく作ると再利用が効く……という特性を持っているからです。
コンポーネントの再利用は共通部品(ボタンとかフォームとか)を予め作っておいて、使う際にpropsとstateを使って適宜必要部品とするみたいなものだと思ってください。
上の例だとレイアウトを司るコンポーネントなんかは使い回しが効きそうですよね。
これでじゃあ何が起きるかというとうっかりするといざってときにpropsが受け取れなかったり、受け取るのに無駄にコードを書くことになってしまう……なんてことになります。
私は今回あまり上手に作れた……というわけではないのでなんとも言えないのですがこのあたりがうまくいかないとコンポーネントの再利用の際に困る……なんてことになるかもしれません。
ともあれ、私自身まだまだ勉強中の身でこのあたりの設計についてきちんと語れるわけでもないのでひとまずは先程挙げた通り


- Reactは親から子へstateに格納したアレコレ(props)渡して色々やる。
- stateは基本的にコンポーネント内だけでの存在で`、他のコンポーネントと共有はできない。
- Reactはコンポーネントという単位でページをパーツに分割することができる。

という点だけまずは意識していきましょう。

では実際にどのようなコンポーネントの構成にしていくかというと大まかには以下のように3つの構成となります。

- index.js → コンポーネントのルートの役割を担う
- App.js → ページの中心部分、以下実例

```jsx

import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import MainContent from "./MainContent";
import { BrowserRouter } from "react-router-dom";
import AlertComponent from './Components/Alert';
import HeaderComponent from './Components/Header';
import FooterComponent from './Components/Footer';

var csrftoken = Cookies.get("csrftoken");
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.withCredentials = true;

export default class App extends Component {

  render() {
    return (
      <React.Fragment>
          <BrowserRouter>
          <div className="app">
              // ヘッダー関連のコンポーネントの親コンポーネント
              <HeaderComponent />
              // コンテンツ関連のコンポーネントの親コンポーネント
              <MainContent />
              // アラート関連のコンポーネントの親コンポーネント
              <AlertComponent />
              <footer>
              // フッター関連のコンポーネントの親コンポーネント
                <FooterComponent />
              </footer>
          </div>
          </BrowserRouter>

      </React.Fragment>
    );
  }
}

```

色々書いてある他の部分は今は無視してもらってコメントがある部分だけ注目してもらえればどのような役割になっているかわかると思います。

- MainContent.js → ルーティングとそれに応じたコンポーネントをApp.jsの`<MainContent />`部分に表示させる役割を持つ。

以下実例です。

```jsx

import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// カスタムルーティング
import PrivateRoute from "./Route/PrivateRoute";
import LoginRoute from "./Route/LoginRoute";
import LogoutRoute from "./Route/LogoutRoute";
// ランディング
import TopPage from "./UserComponents/TopPage";
// ユーザーに関わるルーティング
import User from "./UserComponents/UserPage";
import ChangePassword from "./UserComponents/ChangePassword";
import Unsubscribe from "./UserComponents/Unsubscribe";
import Login from "./UserComponents/LoginFormContainer";
import Logout from "./UserComponents/LogoutForm";
import Register from "./UserComponents/RegisterFormLayout";
// グループに関わるルーティング
import Group from "./GroupComponents/Group";
import GroupJoined from "./GroupComponents/GroupJoined";
import GroupEdit from "./GroupComponents/GroupEdit";
import Group_Public from "./GroupComponents/GroupPublic";
import Group_Detail_Public from "./GroupComponents/GroupDetail_Readonly";
// Todoに関わるルーティング
import Todo from "./TodoComponents/todo";
import Todo_Public from "./TodoComponents/todo_Public";
import TodoDelete from "./TodoComponents/TodoDelete";
import TodoEdit from "./TodoComponents/TodoEdit";
import TaskTimer from "./TodoComponents/TaskTimer";
// 404 error
import NoMatch from "./UserComponents/Nomatch.js"

const MainContent = () => (
  <Switch>
    <Route path="/" exact>
      <TopPage />
    </Route>
    <LoginRoute path="/login" component={Login} />
    <LoginRoute path="/signup" component={Register} />
    <LogoutRoute path="/logout" component={Logout} />
    <PrivateRoute path="/todo/top" component={Todo} />
    <PrivateRoute path="/todo/list/:username" component={Todo_Public} />
    <PrivateRoute path="/todo/delete/:id" component={TodoDelete} />
    <PrivateRoute path="/todo/edit/:id" component={TodoEdit} />
    <PrivateRoute path="/todo/timer/:id" component={TaskTimer} />
    <PrivateRoute path="/user_info" component={User} />
    <PrivateRoute path="/password_change" component={ChangePassword} />
    <PrivateRoute path="/unsubscribe" component={Unsubscribe} />
    <PrivateRoute path="/user_group/top" component={Group} />
    <PrivateRoute path="/user_group/joined" component={GroupJoined} />
    <PrivateRoute path="/user_group/edit/:id" component={GroupEdit} />
    <PrivateRoute path="/user_group/list/:username" component={Group_Public} />
    <PrivateRoute
      path="/user_group/:id/members"
      component={Group_Detail_Public}
    />
    <Route component={NoMatch}></Route>
    {/* <Redirect to="/" /> */}
  </Switch>
);

export default MainContent;

```

これも今は`<Route>`や`<LogoutRoute>`などといったルーティングとそれに対応して表示させるコンポーネントが定義してあるパーツを`<Switch></Switch>`で囲んでいるということだけわかれば大丈夫です。
それだけわかればこのコンポーネントは各コンテンツを司るコンポーネントの親コンポーネントをimportして集約してるなということが理解できるはずです。
これ以下はそれぞれのコンテンツのコンポーネントを作っていく……という形になります。
あくまで一例なのでそれはあしからず。

さて、ここまで見れば

index.js → App.js
App.js → MainContent.js
MainContent.js → 各コンテンツの親コンポーネント
各コンテンツの親コンポーネント → 各コンテンツを構成するコンポーネント


……と常にコンポーネントには親子関係が成り立っていることが理解できたと思います。


### 2.2 React Hooksを使うか、Reduxを使うか

これも私が実際にReactでフロント部分を作ってみて直面した問題です。
とりあえず色々調べてみるとなんかみんなReduxを使ってるからなんとなくReduxを使ってみるかーという感じでRedux Toolkitに手を出して作ってみて、いざ少し慣れていってみると……あれ？ React Hookで全部済むことじゃない？ という自体に陥りました。

じゃあReduxって何さというとざっくり言ってしまうとこれを導入すると、全てのコンポーネントで参照できるstateを作れます。
ただし、作成するには割と手間がかかるかつRedux自体が割とカロリーが高い技術であるという問題があります。
Redux Toolkitを使うとそのあたりを幾分楽にできますが、それでも結構コストは高いし私もまだまだ十全に扱えてるとは言えません。
さて、閑話休題では実際にRedux Toolboxを使ったstaTeの作り方の例を見てみます、手前味噌で申し訳無いですが私の作ったコードから失礼します。

```jsx

// Slice

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state) => {
      return {
        ...state,
        authenticated: true,
      };
    },
    logoutUser: (state) => {
      return {
        ...state,
        authenticated: false,
      };
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export const selectAuthenticated = ({ auth }) => auth.authenticated;
export default authSlice.reducer;


```

```jsx

// Hooks

import { useSelector, useDispatch } from 'react-redux';
import { selectAuthenticated, loginUser, logoutUser } from '../Store/authSlice';

// Sliceで定義した状態管理に対して、useSelectorとuseDispatchを使用したいので関数コンポーネントにし、実際に使うコンポーネントで呼び出せるようにする
function useAuth() {
    // Sliceで定義したアクションをdispatchで呼び出せるようにする
    const dispatch = useDispatch();

    return {
        // Sliceで定義したstate(progress)をuseSelectorを用いて取得
        authenticated: useSelector(selectAuthenticated),
        // 以下はアクションの呼び出し
        loginUser: () => dispatch(loginUser()),
        logoutUser: () => dispatch(logoutUser()),
    };
}

export default useAuth;

```

```jsx

// 各Sliceを集めてStoreというStateの格納場所を作る。便宜上Storeのindex.jsと呼ぶ

import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import spinnerReducer from './spinnerSlice';
import authReducer from './authSlice';
import alertReducer from './alertSlice';
import todosReducer from './todosSlice';
import categoryReducer from './categorySlice';
import changeFlagReducer from './changeFlagSlice';
import pageNationSliceReducer from './pageNationSlice';
import filterReducer from './filterSlice';
import usersReducer from './usersSlice';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
}from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const reducers = combineReducers({
    spinner: spinnerReducer,
    auth: authReducer,
    notifications: alertReducer,
    todos: todosReducer,
    category: categoryReducer,
    flag: changeFlagReducer,
    page: pageNationSliceReducer,
    filter: filterReducer,
    users: usersReducer,
});


const persistConfig = {
    key: 'root', // Storageに保存されるキー名を指定する
    storage, // 保存先としてlocalStorageがここで設定される
    whitelist: ['auth'] // Stateは`todos`のみStorageに保存する
    // blacklist: ['visibilityFilter'] // `visibilityFilter`は保存しない
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
});

export default store;


```

以上3ファイルで成り立っているものだと思ってください。
最後のindex.jsは書いた通り総まとめのファイルになるので実際にはSliceとHooksを作ってStateを作る……と思ってもらえればと。
Sliceはどういうstateでどういうアクションでどう変化させるのかということを定義するファイルで、Hooksは実際にコンポーネントでそれらをHooksとして呼び出せるように定義しているファイルと思ってください。
今回の例はauthenticatedということで当該ユーザーがログイン済みかどうかということを表すstateを定義しています。
ユーザーがログイン済みかどうかという状態はアプリ全体で参照できた方が便利なのでReduxで定義しています。
で、実際にこれらを使っている部分がこちらです。

```jsx

import React from "react";
import LoginForm from "./LoginForm";
import LogoutForm from "./LogoutForm";
import LoginFormLayout from "./LoginFormLayout";
import axios from "axios";
import SpinnerModal from "../Components/Spinner";
import useAlert from "../Hooks/useAlert";
import useAuth from "../Hooks/useAuth";
import useSpinner from "../Hooks/useSpinner";
import { AuthUrls } from "../Utils/authUrls";

const LoginFormContainer = () => {
  // Alert Hooks
  const { createAlert } = useAlert();
  // 認証状態でルーティングするためのHooksを呼び出す
  const { loginUser, authenticated } = useAuth();
  // Spinner Hooks
  const { startProgress, stopProgress, progress } = useSpinner();

  // ログインリクエストURL
  const loginUrl = AuthUrls.LOGIN;
  // スピナー
  let Modal = <SpinnerModal />;

  const onSubmit = async (data) => {
    // BackDropModalとスピナー表示
    startProgress("ログイン中です");

    try {
      const response = await axios.post(loginUrl, data);
      // 呼び出したHooksを使ってauthenticatedをTrueにする
      loginUser();
      createAlert({
        message: "ログインに成功しました",
        type: "success",
      });
      stopProgress();
    } catch (error) {
      createAlert({
        message: "ログインに失敗しました",
        type: "danger",
      });
      stopProgress();
    }
  };

  // 認証状態でフォームチェンジ
  let form = <LoginForm onSubmit={onSubmit} />;

  if (authenticated === true) {
    form = <LogoutForm />;
  }

  // スピナーを出す
  if (!progress) {
    Modal = <SpinnerModal show={false} />;
  }

  return (
    <React.Fragment>
      {Modal}
      <LoginFormLayout>{form}</LoginFormLayout>
    </React.Fragment>
  );
};

export default LoginFormContainer;

```

これも今はコメント部分だけ注目してどう使われているのかというがわかればOKです。
つまりまとめると上記のSliceとHooksを定義することで

- authenticatedというstateにbooleanが格納されif文に使用することができる。
- 上記のstateをloginUser()やlogoutUser()などで変更することができる(今回はTrue or False)
- loginUser()やlogoutUser()はimportさえすれば他のコンポーネントで使うこともできる

ということができるようになったわけです。
勿論、繰り返しになりますがauthenticatedはすべてのコンポーネントに共通しているので、他のコンポーネントで呼び出したりloginUser()やlogoutUser()などで変更することができます。
わかりやすい例だと上記はログインページのコンポーネントになるわけですが以下のようにログアウトページでアクセスしてauthenticatedの状態を変更するというものでしょうか。

```jsx

import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";

import useAuth from "../Hooks/useAuth";

import { Form, Button, ButtonToolbar } from "react-bootstrap";
import { AuthUrls } from "../Utils/authUrls";

const LogoutForm = () => {
  const history = useHistory()
  // React Hook Form
  const { handleSubmit } = useForm();
  const { logoutUser } = useAuth();

  const logoutUrl = AuthUrls.LOGOUT;

  const onSubmit = async () => {
    // authenticatedをFalseにする
    logoutUser();
    await axios.post(logoutUrl);
  };
  return (
    <div>
      <div className="justify-content-center text-center mt-5 mb-3">
        <h3>ログアウトしますか？</h3>
      </div>

      <Form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="justify-content-center"
      >
        <Form.Group>
          <ButtonToolbar className="justify-content-center">
            <Button variant={"danger"} type="submit">
              Yes, Logout
            </Button>
          </ButtonToolbar>
        </Form.Group>
        <div className="logout-button">
          <Button variant="success" onClick={() => history.push(`/`)}>
            No, Go Back Home
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LogoutForm;

```

色々どっとコードがあったりしましたが、とりあえずReduxはすべてのコンポーネントから参照できるStateが欲しい時に使える！ ということだけは理解して頂ければと思います。
実はさらに言うとstateの永続化というのをしないと共有はできません。
Reactはコンポーネントの外に出たり、リロードなどの再描画……などがある(こういうのをコンポーネントの破棄なんて言うそうです)とstateは破棄されてしまいます。
なので、例えばauthenticatedがTrueの場合のみアクセスできるページを作りたいなんて場合にはログイン処理時にauthenticatedをTrueにしてもページ遷移した瞬間Falseに逆戻りするので一生アクセスできない……なんてことになったりします。
詳しくは`Persist`とかStateの永続化あたりでググって頂ければと思います。

さて、ここまででReduxは便利な側面はあるものの結構めんどくさいということがわかったと思います。
ただし、これを使えた方がいい場面があることは上記の例で示した通りなので線引きをしてみたいと思います。
ざっくりいうと以下の2つに分類できるかなと思っています。

- コンポーネントが破棄されてstateがリセットされてもいいような場面やコンポーネント内でのみ使う場合(React Hooks)
- 破棄してほしくない(永続化したい)または親子関係に依らず、グローバルにstateにアクセスしたい場面(Redux)

作ってみて思ったことはReact Hooksがかなり優秀なので大規模なアプリにするということでもない限りはReduxは使わなくても大丈夫かもしれないということです。
なので、もしこれからReactにチャレンジするという方はぜひReact Hooksを少し頑張ってみてほしいです。
それで足りなければReduxを勉強するタイミング……ということなのでしょう。

### 3 React Hooksを使って実際にページを作ってみる

ではここから実際にReact Hooksを使ってページを作ってみます。
Reduxを使わなくてもまあまあ大丈夫そうだなというのをこの工程で感じられると思います。


Djangoプロジェクト立ち上げ(configフォルダ)
↓
frontendフォルダ作成
↓
React HookとMaterial UIとGoogle Books APIsで書籍検索の簡単なアプリを作ってみる。
↓
Djangoと連携、DRFと共にフロントの実行結果等をDBに保存したりできるようにする
↓
できればテストや認証を組み込む


