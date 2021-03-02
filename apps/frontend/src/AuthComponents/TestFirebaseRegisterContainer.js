import React from "react";
import { useState } from "react";
import { Card, CardContent, Box } from '@material-ui/core';
import axios from "axios"
import firebase from '../Utils/Firebase'
import TestFirebaseAuthLayout from './TestFirebaseAuthLayout'
import TestFirebaseRegisterForm from './TestFirebaseRegisterForm'
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

    return(
        <React.Fragment>
            <Box className={classes.contents}>
                <TestFirebaseAuthLayout>
                    {/* <Card>
                        <CardContent> */}
                            <TestFirebaseRegisterForm/>
                        {/* </CardContent>
                    </Card> */}
                </TestFirebaseAuthLayout>
            </Box>
        </React.Fragment>
    )
}

export default TestFirebaseAuthContainer

