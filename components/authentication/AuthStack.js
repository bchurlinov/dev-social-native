import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Login from "../authentication/Login";
import Register from "../authentication/Register";

const AuthStack = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            headerShown: false
        }
    },
    Register: {
        screen: Register,
        navigationOptions: ({ navigation }) => {
            const params = navigation.state.params;
            const routeName = navigation.state.routeName;
            
            return {
                title: params ? params : routeName
            }
        }
    }
})

export default createAppContainer(AuthStack);