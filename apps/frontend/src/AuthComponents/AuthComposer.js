import React from "react";
import { useState } from "react";
import axios from "axios"
import firebase from '../utils/Firebase'

// 認証方法の確認のためにひとまずここでルーティングを行う
// 本使用のときは他のコンテンツとともにContens.jsで管理
const AuthComposer = () => {
    const [ signedIn, setSignedIn ] = useState(false)
    const [ signinCheck, setSignInCheck ] = useState(false)

    firebase.auth().onAuthStateChanged(user=> {
        if(user) {
            setSignedIn(true)
            setSignInCheck(true)
            console.log("already login")
        } else {
            setSignedIn(false)
            setSignInCheck(true)
            console.log(signedIn)
        }
    })

    const TestComponent = <TestFailure />

    if(setSignedIn) {
        TestComponent = <TestSuccess />
    }
    return(
        { TestComponent }
    )
}

export default AuthComposer