import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logIn, autoLogged, registerUser } from "../../store/actions/authAction";
import { ScrollView, View, Text, Keyboard, TouchableOpacity, TextInput, StyleSheet, Alert, TouchableWithoutFeedback } from "react-native";
import { AsyncStorage } from "react-native";
import globalStyles from "../../styles/styles";
import _ from "lodash";
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({ registerUser, autoLogged, navigation }) => {

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

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
            // setInputs({
            //     name: "",
            //     email: "",
            //     password: "",
            //     passwordConfirm: ""
            // });
            let credentials = _.omit(inputs, ["passwordConfirm"]);
            registerUser(credentials);
        }
    }

    const formValid = () => {
        if (inputsLength()) {
            Alert.alert("SocialDev", "Input fields shouldn't be empty");
            return false;
        } else if (!checkName()) {
            Alert.alert("SocialDev", "Name should contain at least 2 characters");
            return false;
        } else if (!emailValid()) {
            Alert.alert("SocialDev", "Enter a valid e-mail address");
            return false;
        } else if (!checkPassword()) {
            Alert.alert("SocialDev", "Password should contain at least 3 characters");
            return false;
        } else if (!comparePasswords()) {
            Alert.alert("SocialDev", "Passwords don't match");
            return false;
        } else {
            return true;
        }
    }

    const checkName = () => {
        return inputs.name.length > 2
    }

    const emailValid = () => {
        return inputs.email.match(/\S+@\S+\.\S+/);
    };

    const checkPassword = () => {
        return inputs.password.length >= 3
    }

    const comparePasswords = () => {
        return inputs.password === inputs.passwordConfirm
    }

    const inputsLength = () => {
        return (
            !inputs.email.length || !inputs.password.length
        )
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>
                <ScrollView style={globalStyles.inputAuthContainer}>
                    <View>
                        <Text style={{ textAlign: "center" }}>
                            <Icon name="comments" size={60} color="#1890ff" />
                        </Text>
                        <Text style={styles.text}>Social <Text style={styles.span}>Dev</Text></Text>
                    </View>
                    <View style={styles.headerContainer}>

                        <Text style={styles.header}>
                            Register
                </Text>
                    </View>

                    <View style={globalStyles.inputGroup}>
                        <TextInput
                            placeholder="Enter your name"
                            style={globalStyles.input}
                            value={inputs.name}
                            onChangeText={(value) => inputHandler(value, 'name')}
                        />
                    </View>

                    <View style={globalStyles.inputGroup}>
                        <TextInput
                            placeholder="Enter your e-mail address"
                            keyboardType="email-address"
                            style={globalStyles.input}
                            value={inputs.email}
                            onChangeText={(value) => inputHandler(value, 'email')}
                        />
                    </View>

                    <View style={globalStyles.inputGroup}>
                        <TextInput
                            placeholder="Enter your password"
                            secureTextEntry={true}
                            onChangeText={(value) => inputHandler(value, 'password')}
                            value={inputs.password}
                            style={globalStyles.input}
                        />
                    </View>

                    <View style={globalStyles.inputGroup}>
                        <TextInput
                            placeholder="Confirm your password"
                            secureTextEntry={true}
                            onChangeText={(value) => inputHandler(value, 'passwordConfirm')}
                            value={inputs.passwordConfirm}
                            style={globalStyles.input}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <TouchableOpacity onPress={submitHandler} style={styles.submit}>
                            <Text style={styles.submitText}>Register</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity title="Register"
                            onPress={() => navigation.navigate("Login")}>
                            <Text style={{ textAlign: "center", marginTop: 10 }}>
                                You already have an account,
                            <Text style={styles.switchAuth}> click here</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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

    },
    submit: {
        backgroundColor: "#1890ff",
        padding: 10,
        borderRadius: 1
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


export default connect(null, { logIn, autoLogged, registerUser })(Login);
