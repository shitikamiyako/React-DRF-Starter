import React from "react";
import { useState } from "react";
import { Card, CardContent, Box } from '@material-ui/core';
import axios from "axios"
import firebase from '../Utils/Firebase'
import TestFirebaseAuthLayout from './TestFirebaseAuthLayout'
import TestFirebaseAuthForm from './TestFirebaseAuthForm'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    contents: {
        marginTop: 30
    },
    input: {
        marginBottom: 20,
    },
    // TextFieldのラベルに関するスタイル
    //     InputLabelProps={{
    //     classes: {
    //         root: classes.labelRoot,
    //     }
    // }} をタグ内に属性として配置する

    // labelRoot: {
    //     fontSize: 12,

    // },
}));

// 認証方法の確認のためにひとまずここでルーティングを行う
// 本使用のときは他のコンテンツとともにContens.jsで管理
const TestFirebaseAuthContainer = () => {
    const classes= useStyles();
    let responseJson = []
    const onTwiiterLogin = () => {
        const provider = new firebase.auth.TwitterAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(res=> {
                console.log(res);
                firebase
                    .auth()
                    .currentUser
                    .getIdToken(/* forceRefresh */ true)
                    .then( (idToken) => {
                        console.log(idToken)
                    }).catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(err => {
                console.log(err);
            })
    }

    return(
        <React.Fragment>
            <Box className={classes.contents}>
                <TestFirebaseAuthLayout>
                    {/* <Card>
                        <CardContent> */}
                            <TestFirebaseAuthForm onSubmit={console.log}  TwitterAuth={onTwiiterLogin} />
                        {/* </CardContent>
                    </Card> */}
                </TestFirebaseAuthLayout>
            </Box>
        </React.Fragment>
    )
}

export default TestFirebaseAuthContainer

