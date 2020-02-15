import axios from "axios";
import { url } from "../../config/utilities";
import {
    LOG_IN,
    AUTO_LOGGED,
    LOG_OUT,
    AUTH_ERROR_MESSAGE,
    CLEAR_AUTH,
    LOAD_USER
} from "./types";
import { AsyncStorage } from 'react-native';

export const registerUser = credentials => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${url}/auth/register`, credentials);
            const token = await AsyncStorage.setItem("token", response.data.token);

            dispatch({
                type: LOG_IN,
            });

            dispatch(loadUser());

        } catch (err) {
            console.log(err.response);
        }
    }
}

export const logIn = credentials => {
    return async (dispatch) => {
        try {

            const response = await axios.post(`${url}/auth/login`, credentials);
            const token = await AsyncStorage.setItem("token", response.data.token);
            console.log(response.data.token);

            dispatch({
                type: LOG_IN,
            });

            dispatch(loadUser());

        } catch (err) {
            console.log(err.response);

            dispatch({
                type: AUTH_ERROR_MESSAGE,
                message: err.response.data.message
            });

            setTimeout(() => {
                dispatch({ type: CLEAR_AUTH });
            }, 750);
        }
    }
}

export const loadUser = () => {
    return async (dispatch) => {
        try {

            const userData = await axios.get(`${url}/auth/getuser`);
         
            dispatch({
                type: LOAD_USER,
                payload: userData.data
            });

        } catch (err) {
            console.log(err);
        }

    }
};

export const autoLogged = () => {
    return (dispatch) => {

        dispatch({
            type: AUTO_LOGGED
        })
    }
}

export const logOut = () => {
    return async (dispatch) => {
        try {

            await AsyncStorage.removeItem("token");

            dispatch({
                type: LOG_OUT
            });

        } catch (err) {
            console.log(err);
        }
    }
}

export const storePushToken = token => {
    return async (dispatch) => {
        try {
            const pushToken = await axios.post(`${url}/auth/pushtoken`, { token });
        } catch (err) {
            console.log(err);
        }
    }
}