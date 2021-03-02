import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// ログイン状態でルーティング
// ログイン・ユーザー登録のルーティング
import Login from "./AuthComponents/TestFirebaseAuthContainer";
import Logout from "./AuthComponents/TestFirebaseLogoutContainer";
import Register from "./AuthComponents/TestFirebaseRegisterContainer";

// コンテンツへのルーティング
import Landing from "./HomeComponents/Landing";
import Home from "./HomeComponents/Home";
import Profile from "./UserComponents/Profile";
import MyAccount from "./UserComponents/MyAccount";
import SearchBooks from "./BookComponents/SearchBookContainer";
// import NoMatch from "./HomeComponents/Nomatch.js"

const Contents = () => {
return (
    <Switch>
        <Route path="/" exact>
        <Landing />
        </Route>
        <Route path="/Home" component={Home} />
        <Route path="/Profile" component={Profile} />
        <Route path="/MyAccount" component={MyAccount} />
        <Route path="/Login" component={Login} />
        <Route path="/Logout" component={Logout} />
        <Route path="/SignUp" component={Register} />
        {/* <Route path="/user" component={} /> */}
        <Route path="/Search_Book" component={SearchBooks} />
        {/* <Route path="/search_book" component={SearchBooks} />
            <Route path="/search_book" component={SearchBooks} /> */}
        {/* <Route component={NoMatch}></Route> */}
        <Redirect to="/" />
    </Switch>
    );
};

export default Contents;
