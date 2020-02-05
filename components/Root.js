import React, { useEffect } from "react";
import { connect } from "react-redux";

import Navigator from "../components/Navigation/Navigator";
import AuthStack from "../components/authentication/AuthStack";
import { requestInterceptor } from "../config/RequestService";
import { storePushToken } from "../store/actions/authAction";
import { AsyncStorage } from "react-native";
import axios from "axios";
import { url } from "../config/utilities";

const Root = ({ isAuthenticated, storePushToken }) => {

    useEffect(() => {
        retrieveToken();
    }, []);

    const retrieveToken = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (token !== null) {
                requestInterceptor(token);
            }
        } catch (error) {
            throw error;
        }
    };


    return isAuthenticated ? <Navigator /> : <AuthStack />
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}

export default connect(mapStateToProps, { storePushToken })(Root);
