import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logIn, autoLogged } from "../../store/actions/authAction";
import { View, Text, Keyboard, TouchableOpacity, TextInput, StyleSheet, Alert, TouchableWithoutFeedback } from "react-native";
import { AsyncStorage } from "react-native";
import globalStyles from "../../styles/styles";
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({ logIn, autoLogged, navigation, errorMessage }) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        if (errorMessage) {
            Alert.alert("SocialDev", errorMessage);
        }
    }, [errorMessage]);

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {
                autoLogged();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const inputHandler = (value, name) => {
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const submitHandler = () => {
        if (formValid()) {
            logIn(inputs);
        }
    }

    const formValid = () => {
        if (inputsLength()) {
            Alert.alert("SocialDev", "Input fields shouldn't be empty");
            return false;
        } else if (!emailValid()) {
            Alert.alert("SocialDev", "Enter a valid e-mail address");
            return false;
        } else if (!checkPassword()) {
            Alert.alert("SocialDev", "Password should contain at least 3 characters");
            return false;
        } else {
            return true;
        }
    }

    const emailValid = () => {
        return inputs.email.match(/\S+@\S+\.\S+/);
    };

    const checkPassword = () => {
        return inputs.password.length >= 3
    }

    const inputsLength = () => {
        return (
            !inputs.email.length || !inputs.password.length
        )
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={globalStyles.inputAuthContainer}>
                <View style={{ marginTop: 35 }}>
                    <Text style={{ textAlign: "center" }}>
                        <Icon name="comments" size={60} color="#1890ff" />
                    </Text>
                    <Text style={styles.text}>Social <Text style={styles.span}>Dev</Text></Text>
                </View>
                <View style={styles.headerContainer}>

                    <Text style={styles.header}>
                        Log in
                </Text>
                </View>
                <View style={globalStyles.inputGroup}>
                    <TextInput
                        placeholder="Enter your e-mail address"
                        keyboardType="email-address"
                        style={globalStyles.input}
                        onChangeText={(value) => inputHandler(value, 'email')}
                    />
                </View>
                <View style={globalStyles.inputGroup}>
                    <TextInput
                        placeholder="Enter your password"
                        secureTextEntry={true}
                        onChangeText={(value) => inputHandler(value, 'password')}
                        style={globalStyles.input}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TouchableOpacity onPress={submitHandler} style={styles.submit}>
                        <Text style={styles.submitText}>Log in</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity title="Register"
                        onPress={() => navigation.navigate("Register", "Back to Login")}>
                        <Text style={{ textAlign: "center", marginTop: 15 }}>
                            You don't have an account,
                            <Text style={styles.switchAuth}> click here</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    text: {
        textAlign: "center",
        fontSize: 30,
        color: "#565656",
        marginBottom: 20
    },
    mainLogo: {
        textAlign: "center",
        marginTop: 50,
        marginBottom: 5
    },
    span: {
        fontWeight: "bold"
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    header: {
        marginLeft: 8,
        fontSize: 18
    },
    authIcon: {
        position: "relative"
    },
    submit: {
        backgroundColor: "#1890ff",
        padding: 10,
        borderRadius: 2,
        marginTop: 10,
        height: 40
    },
    submitText: {
        textAlign: "center",
        color: "white",
        fontSize: 15
    },
    switchAuth: {
        fontWeight: "bold",
        color: "#1890ff"

    }
});


const mapStateToProps = state => {
    return {
        errorMessage: state.auth.errorMessage
    }
}


export default connect(mapStateToProps, { logIn, autoLogged })(Login);
