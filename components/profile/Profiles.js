import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loadProfiles } from "../../store/actions/profileAction";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Picker, Dimensions, TextInput } from "react-native";
import ProfileCard from "../profile/ProfileCard";
import CommentCard from "../comments/commentCard";
import ModalSelector from 'react-native-modal-selector'
import _ from "lodash";

const Profiles = ({ navigation, userData, profiles, loadProfiles }) => {

    const [input, setInputs] = useState({
        status: "",
        skills: "",
        location: ""
    });

    useState(() => {

    }, []);

    const inputHandler = (value, name) => {
        setInputs({
            ...input,
            [name]: value.value
        })
    }

    const locationInputHandler = value => {
        setInputs({
            ...input,
            location: value
        })
    }

    const renderProfiles = () => {
        return profiles && _.map(profiles, (profile, index) => {
            return (
                <View style={{ marginVertical: 15 }} key={index}>
                    <ProfileCard
                        profiles={profile}
                        navigation={navigation}
                        currentUser={userData}
                        screenWidth={1.1}
                    />
                </View>
            )
        })
    }

    const filterProfiles = () => {
        const { status, skills, location } = input;
        loadProfiles(status, skills, location);
    }

    let width = Dimensions.get('window').width;

    let statusIndex = 0;
    const [statusData, setStatusData] = useState([
        { key: statusIndex++, label: 'Front End Developer', value: "front_end" },
        { key: statusIndex++, label: 'Back End Developer', value: "back_end" },
        { key: statusIndex++, label: 'Full Stack Developer', value: "full_stack" },
    ]);

    const setStatus = status => {
        let newStatus = status.split("_");
        return _.startCase(_.toLower(newStatus[0])) + " " + _.startCase(_.toLower(newStatus[1]));
    }

    let skillsIndex = 0;
    const [skillsData, setSkillsData] = useState([
        { key: skillsIndex++, label: 'HTML5', value: "html5" },
        { key: skillsIndex++, label: 'CSS3', value: "css3" },
        { key: skillsIndex++, label: 'Javascript', value: "javascript" },
        { key: skillsIndex++, label: 'Jquery', value: "jquery" },
        { key: skillsIndex++, label: 'Node.js', value: "node" },
        { key: skillsIndex++, label: 'PHP', value: "php" },
        { key: skillsIndex++, label: 'Python', value: "python" },
        { key: skillsIndex++, label: 'React.js', value: "react" },
        { key: skillsIndex++, label: 'Angular', value: "angular" },
        { key: skillsIndex++, label: 'Vue.js', value: "vue" },
        { key: skillsIndex++, label: 'Bootstrap', value: "bootstrap" },
        { key: skillsIndex++, label: 'Foundation', value: "foundation" },
    ]);

    const setSkills = skill => {
        return _.startCase(_.toLower(skill))
    }


    return (
        <View style={styles.contentContainer}>
            <ScrollView>
                <Text style={{ fontSize: 20, marginBottom: 5, textAlign: "center" }}>Profiles</Text>
                <View style={{ marginVertical: 20 }}>

                    <View>
                        <Text style={{
                            fontStyle: "italic",
                            color: "#565656",
                            fontSize: 12,
                            marginLeft: 5,
                            marginBottom: 5
                        }}>Select location:</Text>
                        <View style={{
                            borderColor: "#dbdbdb",
                            borderWidth: 1,
                            borderRadius: 2,
                            marginBottom: 10
                        }}>
                            <TextInput
                                style={{ height: 40, paddingLeft: 10, fontSize: 17, width: width / 1.2 }}
                                onChangeText={(value) => locationInputHandler(value, "location")}
                                value={input.location}
                            />
                        </View>
                    </View>

                    <View style={{ flexDirection: "column", marginBottom: 10 }}>
                        <Text style={{
                            fontStyle: "italic",
                            color: "#565656",
                            fontSize: 12,
                            marginLeft: 5,
                            marginBottom: 5
                        }}>Select status:</Text>
                        <ModalSelector
                            data={statusData}
                            initValue=""
                            accessible={true}
                            scrollViewAccessibilityLabel={'Scrollable options'}
                            cancelButtonAccessibilityLabel={'Cancel Button'}
                            onChange={(value) => inputHandler(value, "status")}
                            animationType="fade"
                            supportedOrientations={['portrait']}
                            backdropPressToClose={true}
                        >

                            <TextInput
                                style={{ borderWidth: 1, borderColor: '#dbdbdb', padding: 10, height: 42 }}
                                editable={false}
                                placeholder=""
                                value={setStatus(input.status)} />

                        </ModalSelector>
                    </View>

                    <View style={{ flexDirection: "column", marginBottom: 10 }}>
                        <Text style={{
                            fontStyle: "italic",
                            color: "#565656",
                            fontSize: 12,
                            marginLeft: 5,
                            marginBottom: 5
                        }}>Select skill:</Text>
                        <ModalSelector
                            data={skillsData}
                            initValue=""
                            accessible={true}
                            scrollViewAccessibilityLabel={'Scrollable options'}
                            cancelButtonAccessibilityLabel={'Cancel Button'}
                            onChange={(value) => inputHandler(value, "skills")}
                            animationType="fade"
                            supportedOrientations={['portrait']}
                            backdropPressToClose={true}
                        >

                            <TextInput
                                style={{ borderWidth: 1, borderColor: '#dbdbdb', padding: 10, height: 42 }}
                                editable={false}
                                placeholder=""
                                value={setSkills(input.skills)} />

                        </ModalSelector>
                    </View>

                </View>

                <View style={{
                    backgroundColor: "#1890ff",
                    padding: 5,
                    width: "100%"
                }}>
                    <TouchableOpacity onPress={filterProfiles}>
                        <Text style={{ color: "white", textAlign: "center", borderRadius: 2 }}>
                            Search
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.profilesContainer} horizontal={false}>
                    {profiles.length !== 0 ?
                        renderProfiles()
                        :
                        <Text style={{ marginTop: 30, color: "#565656" }}>
                            Your search did not return any results.
                </Text>
                    }
                </ScrollView>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    profilesContainer: {
        marginTop: 30
    }
});

const mapStateToProps = state => {
    return {
        userData: state.auth.userData,
        profiles: state.profile.profiles
    }
}

export default connect(mapStateToProps, { loadProfiles })(Profiles);