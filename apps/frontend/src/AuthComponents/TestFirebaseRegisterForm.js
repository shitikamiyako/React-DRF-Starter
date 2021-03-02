import React from "react";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import {
    TextField,
    Button,
    Grid,
    Input,
    Box,
    Typography,
} from "@material-ui/core";
import { ErrorMessage } from "@hookform/error-message";
import TwitterIcon from "@material-ui/icons/Twitter";
import firebase from '../Utils/Firebase'


const useStyles = makeStyles((theme) => ({
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

const TestFirebaseRegisterForm = ({ onSubmit }) => {
    const { control, handleSubmit, errors } = useForm();
    console.log("RegisterForm.render");

    const classes = useStyles();

    const RegisterTest = (data) => {
        const email = data.email;
        const password = data.password;
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log("Success, UserRegister")
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* <Grid item xs={12}>
                    <Controller
                        as={
                            <TextField
                                label="username"
                                placeholder="username"
                                inputProps={{ min: 0, style: { textAlign: "center" } }}
                            />
                        }
                        name="username"
                        control= {control}
                        rules={{
                            required: "ユーザ名は必須です",
                            maxLength: {
                                value: 30,
                                message: "30文字以内です"
                            }
                        }}
                        defaultValue=""
                    />
                    <div ClassName="form-error-message">
                        <ErrorMessage errors={errors} name="multipleErrorInput">
                            { ({ messages }) =>
                                messages &&
                                Object.entries(messages).map(([type, message]) => (
                                    <p key={type}>{message}</p>
                                ))
                            }
                        </ErrorMessage>
                    </div>
                </Grid> */}
                <Grid item xs={12}>
                    <Box mt={1} textAlign="center">
                        <Controller
                            as={
                                <TextField
                                    key="Email"
                                    className={classes.input}
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    inputProps={{
                                        min: 0,
                                        style: {
                                            textAlign: "center",
                                            height: 60,
                                        },
                                    }}
                                />
                            }
                            name="email"
                            control={control}
                            rules={{
                                required: "メールアドレスは必須です",
                                maxLength: {
                                    value: 30,
                                    message: "30文字以内です",
                                },
                            }}
                            defaultValue=""
                        />
                        <div ClassName="form-error-message">
                            <ErrorMessage errors={errors} name="multipleErrorInput">
                                {({ messages }) =>
                                    messages &&
                                    Object.entries(messages).map(([type, message]) => (
                                        <p key={type}>{message}</p>
                                    ))
                                }
                            </ErrorMessage>
                        </div>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box mt={1} textAlign="center">
                        <Controller
                            as={
                                <TextField
                                    className={classes.input}
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    inputProps={{
                                        min: 0,
                                        style: {
                                            textAlign: "center",
                                            height: 60,
                                        },
                                    }}
                                />
                            }
                            name="password"
                            control={control}
                            rules={{
                                required: "パスワードは必須です",
                                maxLength: {
                                    value: 30,
                                    message: "30文字以内です",
                                },
                            }}
                            defaultValue=""
                        />
                        <div ClassName="form-error-message">
                            <ErrorMessage errors={errors} name="multipleErrorInput">
                                {({ messages }) =>
                                    messages &&
                                    Object.entries(messages).map(([type, message]) => (
                                        <p key={type}>{message}</p>
                                    ))
                                }
                            </ErrorMessage>
                        </div>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box mt={1} textAlign="center">
                        <Button color="primary" variant="outlined" type="submit">
                            Register
                        </Button>
                    </Box>
                </Grid>

            </form>
        </React.Fragment>
    );
};

export default TestFirebaseRegisterForm;
