import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// ログイン状態でルーティング
// ログイン・ユーザー登録のルーティング
// コンテンツへのルーティング
import SearchBooks from "../BookComponents/SearchBookContainer"

const Contents = () => {
    <Switch>
        <Route path="/" exact>
            <Home />
        </Route>
        {/* <Route path="/login" component={} />
        <Route path="/signup" component={} />
        <Route path="/logout" component={} />
        <Route path="/user" component={} /> */}
        <Route path="/search_book" component={SearchBooks} />
        {/* <Route path="/search_book" component={SearchBooks} />
        <Route path="/search_book" component={SearchBooks} /> */}
    </Switch>
}