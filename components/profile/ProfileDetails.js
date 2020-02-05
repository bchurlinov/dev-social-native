import React from "react";
import { StyleSheet, View, ScrollView, Text, Image, Linking } from "react-native";
import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome";
import _ from "lodash";

const ProfileDetails = ({ navigation }) => {

    const profile = navigation.state.params;
    console.log(profile);

    const setProfileStatus = status => {
        const userStatus = status.split("_");
        return _.startCase(_.toLower(userStatus[0])) + " " + _.startCase(_.toLower(userStatus[1]));
    }

    const renderSkills = item => {
        return item && _.map(item.skills, (skill, index) => {
            return (
                <View key={index}>
                    <Text style={styles.skillsItem}>
                        <Icon name="check" size={15} color="#1890ff" /> {skill}
                    </Text>
                </View>
            )
        })
    }

    const deleteExperienceIcon = () => {
        return profile.user._id === profile.currentUser._id ? <Icon name='trash' size={17} color='indianred' /> : null;
    }

    const deleteEducationIcon = () => {
        return profile.user._id === profile.currentUser._id ? <Icon name='trash' size={17} color='indianred' /> : null;
    }

    const renderExperience = experience => {
        return experience && _.map(experience, (item, index) => {
            return (
                <View key={index} style={{ marginVertical: 10 }}>
                    <Text style={styles.company}>{item.company} {"   "}
                        {deleteExperienceIcon()}
                    </Text>
                    <Text>{checkPeriod(item)}</Text>
                    <Text style={styles.experienceItem}><Text style={{ fontWeight: "bold" }}>Position: </Text>{item.position}</Text>
                    <Text style={styles.experienceItem}><Text style={{ fontWeight: "bold" }}>Location: </Text>{item.location}</Text>
                    <Text style={styles.experienceItem}><Text style={{ fontWeight: "bold" }}>Description: </Text>{item.description}</Text>
                </View>
            )
        })
    }

    const renderEducation = education => {
        return education && _.map(education, (item, index) => {
            return (
                <View key={index} style={{ marginVertical: 10 }}>
                    <Text style={styles.company}>{item.school} {"   "}
                        {deleteEducationIcon()}
                    </Text>
                    <Text>{checkPeriod(item)}</Text>
                    <Text style={styles.experienceItem}><Text style={{ fontWeight: "bold" }}>Position: </Text>{item.degree}</Text>
                    <Text style={styles.experienceItem}><Text style={{ fontWeight: "bold" }}>Location: </Text>{item.fieldofstudy}</Text>
                    <Text style={styles.experienceItem}><Text style={{ fontWeight: "bold" }}>Description: </Text>{item.description}</Text>
                </View>
            )
        })
    }

    const checkPeriod = period => {
        return <Text style={styles.experienceItem}>
            <Text style={{ fontWeight: "bold" }}>Period: </Text>
            {moment(period.from).format("MMM-D-YYYY")} - {!period.current ? moment(period.to).format("MMM-D-YYYY") : "Current"}
        </Text>
    }

    const bioCheck = name => {
        return <Text style={{ textAlign: "center" }}>{name} hasn't submitted any bio yet. Please check again at some other time.</Text>
    }

    return (
        <View style={styles.detailsContainer}>
            <ScrollView>
                <View style={styles.detailsHeader}></View>
                <View style={styles.detailsWrap}>
                    <View style={styles.imageWrapper}>
                        <Image source={{ uri: profile.user.avatar }} style={styles.detailsHeaderImage} />
                    </View>
                    <View style={styles.detailsUserInfo}>
                        <Text style={styles.userName}>{profile.user.name}</Text>
                        <Text style={styles.status}>{setProfileStatus(profile.status)} Developer</Text>
                        <Text style={styles.location}>{profile.location}</Text>
                    </View>
                    <View style={{ padding: 20, borderTopColor: "#e4e4e4", borderTopWidth: 1 }}>
                        <Text style={styles.bioHeading}> <Icon name="book" size={15} color="#1890ff" />{"  "} Biography:</Text>
                        <Text style={styles.bio}>{profile.bio ? profile.bio : bioCheck(profile.user.name)}</Text>
                    </View>
                    <View style={{ padding: 20, borderTopColor: "#e4e4e4", borderTopWidth: 1, alignItems: "center", flexDirection: "column" }}>
                        <Text style={{ marginBottom: 5 }}>

                        </Text>
                        <Text style={styles.personalWebsiteHeading}><Icon name="globe" size={15} color="#1890ff" />{"  "} {profile.user.name}'s personal website:</Text>
                        <Text style={styles.website} onPress={() => { Linking.openURL(profile.website) }}>{profile.website}</Text>
                    </View>
                    <View style={{ padding: 20, borderTopColor: "#e4e4e4", borderTopWidth: 1, alignItems: "center" }}>
                        <Text style={styles.skillsHeading}><Icon name="sliders" size={15} color="#1890ff" />{"  "} {profile.user.name}'s skills and areas of expertise:</Text>
                        <ScrollView horizontal={true} style={styles.skillsWrapp}>
                            {renderSkills(profile)}
                        </ScrollView>
                    </View>
                    <View style={{ padding: 20, borderTopColor: "#e4e4e4", borderTopWidth: 1 }}>
                        <Text style={styles.experience}><Icon name="clipboard" size={20} color="#1890ff" />{"  "} Experience</Text>
                        <View>
                            {profile.experience.length !== 0 ?
                                renderExperience(profile.experience)
                                :
                                <Text style={{ color: "#565656" }}>{profile.user.name} hasn't submitted any experience yet.</Text>
                            }
                        </View>
                    </View>
                    <View style={{ padding: 20, borderTopColor: "#e4e4e4", borderTopWidth: 1 }}>
                        <Text style={styles.experience}><Icon name="book" size={20} color="#1890ff" />{"  "} Education</Text>
                        <View>
                            {profile.education.length !== 0 ?
                                renderEducation(profile.education)
                                :
                                <Text style={{ color: "#565656" }}>{profile.user.name} hasn't submitted any education yet.</Text>
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    detailsContainer: {
        padding: 25,
        flex: 1,
    },
    detailsWrap: {
        borderColor: "#e4e4e4",
        borderWidth: 1
    },
    detailsHeader: {
        height: 100,
        backgroundColor: "#1890ff"
    },
    imageWrapper: {
        zIndex: 50,
        position: "relative",
        left: "50%",
        marginTop: -35,
        marginLeft: -35
    },
    detailsHeaderImage: {
        width: 70,
        height: 70,
        borderRadius: 50
    },
    detailsUserInfo: {
        marginVertical: 10,
    },
    userName: {
        color: "#565656",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 25
    },
    bioHeading: {
        color: "#565656",
        textAlign: "center",
        marginBottom: 10
    },
    status: {
        textAlign: "center",
        fontSize: 18,
        color: "#565656",
    },
    location: {
        textAlign: "center",
        color: "#565656",
        textTransform: "capitalize"
    },
    bio: {
        textAlign: "justify",
        color: "#565656"
    },
    personalWebsiteHeading: {
        color: "#565656"
    },
    skillsWrapp: {
        marginTop: 5,
        height: 25
    },
    skillsHeading: {
        color: "#565656",
        marginBottom: 5
    },
    skillsWrap: {
        flexDirection: "row"
    },
    skillsItem: {
        textTransform: "uppercase",
        paddingRight: 20
    },
    website: {
        color: "#565656",
        fontStyle: "italic",
        color: "#1890ff"
    },
    experience: {
        color: "#565656",
        fontWeight: "bold",
        fontSize: 15,
        marginBottom: 10
    },
    company: {
        color: "#565656",
        fontWeight: "bold",
        fontSize: 15
    },
    experienceItem: {
        color: "#565656",
        marginTop: 2
    }
});

export default ProfileDetails;