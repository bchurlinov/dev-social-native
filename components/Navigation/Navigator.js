import React from "react";
import { connect } from "react-redux";
import { logOut } from "../../store/actions/authAction";
import { View, Text, SafeAreaView, ScrollView, Button, TouchableOpacity } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import Header from "./Header";
import Home from "../Home";
import ProfileDetails from "../profile/ProfileDetails";
import Profiles from "../profile/Profiles";
import Comments from "../comments/comments";
import Discussion from "../comments/discussion";
import AddProfile from "../profile/addProfile";

import Icon from "react-native-vector-icons/FontAwesome";

const HomeStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title="" />
            }
        }
    },
    ProfileDetails: {
        screen: ProfileDetails,
        navigationOptions: {
            title: 'Profile Details'
        }
    },
    Profiles: {
        screen: Profiles,
        navigationOptions: {
            title: 'Profiles'
        }
    },
    Discussion: {
        screen: Discussion,
        navigationOptions: {
            title: 'Discussion'
        }
    },
    AddProfile: {
        screen: AddProfile,
        navigationOptions: {
            title: 'Add Profile'
        }
    }
}, {
    defaultNavigationOptions: {
        headerTintColor: "#444",
        headerStyle: { backgroundColor: "#ffff", height: 80 }
    }
});

const dispatchLogOut = items => {
    items.logOut()
}

const CustomDrawerComponent = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ height: 100, backgroundColor: "white", alignItems: "center", marginTop: 25 }}>
                <Icon name="comments" size={60} color="#1890ff" />
                <Text>Social <Text>Dev</Text></Text>
            </View>
            <ScrollView>
                <DrawerItems {...props} />
            </ScrollView>
            <View style={{ backgroundColor: "#1890ff" }}>
                <TouchableOpacity onPress={() => dispatchLogOut(props)}>
                    <Text style={{ textAlign: "center", color: "white", padding: 10 }}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const _connectedNavigator = connect(null, { logOut })(CustomDrawerComponent);

const TabNavigator = createBottomTabNavigator({
    Profiles: {
        screen: Profiles,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => ( 
                <Icon name="user" size={20} color="#1890ff" />
            )
        },

    },
    Comments: {
        screen: Comments,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => ( 
                <Icon name="comment" size={20} color="#1890ff" />
            )
        },
    },
});

const TabStackNavigator = createStackNavigator({
    DashboardTabNavigator: {
        screen: TabNavigator,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title="" />
            }
        }
    }
}, {
    unmountInactiveRoutes: true
})

const RootDrawerNavigator = createDrawerNavigator({
    HomeStack: {
        screen: HomeStack,
        navigationOptions: {
            drawerLabel: "Home",
            drawerIcon: ({ tintColor }) => (
                <Icon name="home" size={20} color="#1890ff" />
            )
        }
    },
    Dashboard: {
        screen: TabStackNavigator,
        navigationOptions: {
            drawerLabel: "Profiles / Comments",
            drawerIcon: ({ tintColor }) => (
                <Icon name="user" size={20} color="#1890ff" />
            )
        }
    },
}, {
    contentComponent: _connectedNavigator,
    unmountInactiveRoutes: true,
    drawerWidth: 300,
    contentOptions: {
        activeTintColor: "#1890ff"
    }
});


export default createAppContainer(RootDrawerNavigator);