import React, {useState} from "react";
import {StyleSheet, Image} from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import {
    ErrorMessage,
    Form,
    FormField,
    SubmitButton,
} from "../components/forms";
import authApi from "../api/login";
import useAuth from "../auth/useAuth";
import ActivityIndicator from "../components/ActivityIndicator";
import Image2 from "../components/Image";

const validationSchema = Yup.object().shape({
    username: Yup.string().required().label("Username"),
    password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen() {
    const auth = useAuth();
    const [loginFailed, setLoginFailed] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleSubmit = async ({username, password}) => {
        setIsLoggingIn(true);
        const result = await authApi.login(username, password);
        if (!result.ok) return setLoginFailed(true);
        setLoginFailed(false);
        auth.logIn(result.data);
    };

    return (
        <>
            <ActivityIndicator visible={isLoggingIn}/>
            <Screen style={styles.container}>
                <Image2 style={styles.logo} defaultSource={require("../assets/logo-primary.png")} resizeMode={"contain"}/>

                <Form
                    initialValues={{username: "test", password: "test"}}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    <ErrorMessage
                        error="Invalid username and/or password."
                        visible={loginFailed}
                    />
                    <FormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="account"
                        name="username"
                        placeholder="Username"
                    />
                    <FormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        icon="lock"
                        name="password"
                        placeholder="Password"
                        secureTextEntry
                        textContentType="password"
                    />
                    <SubmitButton title="Login"/>
                </Form>
            </Screen>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    logo: {
        width: 200,
        height: 130,
        alignSelf: "center",
        marginTop: 50,
        marginBottom: 20,
    },
});

export default LoginScreen;
