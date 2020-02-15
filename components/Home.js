import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadProfiles } from "../store/actions/profileAction";
import { loadUser } from "../store/actions/authAction";
import { loadTopics } from "../store/actions/postAction";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { Button, Spinner } from "@ui-kitten/components";
import ProfileCard from "./profile/ProfileCard";
import CommentCard from "./comments/commentCard";
import _ from "lodash";

const Home = ({ loadProfiles, loadUser, profiles, navigation, userData, loadTopics, topics }) => {

    useEffect(() => {
        loadProfiles();
        loadUser();
        loadTopics();
    }, []);

    const navigateAddProfile = () => {
        navigation.navigate("AddProfile")
    }

    const renderProfiles = () => {
        return profiles && _.map(profiles.slice(0, 4), (profile, index) => {
            return <ProfileCard
                profiles={profile}
                key={index}
                navigation={navigation}
                currentUser={userData}
                screenWidth={1.2}
            />
        })
    }

    const renderTopics = () => {
        return topics && _.map(topics, (topic, index) => {
            return (
                <CommentCard
                    key={index}
                    topic={topic}
                    screenWidth={1.2}
                    user={userData}
                />
            )
        })
    }

    const getLoadData = () => {
        loadUser();
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.homeContainer}>
                <View style={{ height: 200, marginBottom: 30 }}>
                    <Text style={styles.sectionHeader}>Latest Profiles</Text>
                    <ScrollView horizontal={true} scrollEventThrottle={16} style={styles.profileContainer}>
                        {!profiles ? <Spinner size="large" /> : renderProfiles()}
                    </ScrollView>
                </View>

                <View style={{ height: 200 }}>
                    <Text style={styles.sectionHeader}>Latest Topics</Text>
                    <ScrollView horizontal={true} scrollEventThrottle={16} style={styles.profileContainer}>
                        {!topics ? <Spinner size="large" /> : renderTopics()}
                    </ScrollView>
                </View>

                {!userData.profile &&
                    <View style={{ height: 100, marginTop: 20 }}>

                        <Button onPress={navigateAddProfile} status="info" style={{ backgroundColor: "#1890ff" }} size="small">
                            Create your Profile
                        </Button>
                    </View>
                }

            </ScrollView>
        </View>

    )

};

const styles = StyleSheet.create({
    homeContainer: {
        padding: 25,
        backgroundColor: "white"
    },
    sectionHeader: {
        marginBottom: 15,
        fontSize: 15,
        color: "#565656",
        fontFamily: "regular"
    },
    modalClose: {
        position: 'absolute',
        bottom: 0,
        padding: 8,
        backgroundColor: "#1890ff",
        width: "100%"
    },
    modalCloseText: {
        textAlign: "center",
        color: "#ffff"
    }

});

const mapStateToProps = state => {
    return {
        profiles: state.profile.profiles,
        userData: state.auth.userData,
        topics: state.post.topics
    }
}

export default connect(mapStateToProps, { loadProfiles, loadUser, loadTopics })(Home);
