import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { Button } from "@ui-kitten/components";
import Icon from "react-native-vector-icons/FontAwesome";
import _ from "lodash";

const ProfileCard = ({ profiles, navigation, currentUser, screenWidth }) => {

    const setProfileStatus = status => {
        const userStatus = status.split("_");
        return _.startCase(_.toLower(userStatus[0])) + " " + _.startCase(_.toLower(userStatus[1]));
    }


    useEffect(() => {

    }, []);

    const navigateToDetails = () => {
        navigation.push("ProfileDetails", { ...profiles, ...{ currentUser } });
    }

    const renderSkills = skills => {
        return skills && _.map(skills.slice(0, 3), (skill, index) => {
            return <View key={index}>
                <Text style={styles.skillText}>
                    <Icon name="check" size={15} color="#1890ff" />{"  "}{skill}
                </Text>
            </View>
        })
    }

    let width = Dimensions.get('window').width;

    return (
        <View style={{ width: width / screenWidth }}>
            <View style={styles.innerWrap}>
                <View style={styles.cardHeader}>
                    <Image style={styles.cardHeaderImage} source={{ uri: profiles.user.avatar }} />
                    <Text style={styles.cardHeaderText}>
                        <Text style={{ textTransform: "capitalize" }}>{profiles.user.name}</Text>
                        {"\n"}
                        <Text style={styles.cardStatus}>
                            {setProfileStatus(profiles.status)} Developer
                        </Text>
                    </Text>
                </View>
                <View style={styles.skills}>
                    {renderSkills(profiles.skills)}
                    <Text>...</Text>
                </View>

                <View style={styles.cardLink}>
                    <Button onPress={navigateToDetails} size="tiny" status="info">View Profile</Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    innerWrap: {
        borderWidth: 1,
        borderColor: "#e0e0e0",
        marginRight: 15,
        padding: 20,
        elevation: 1,
        shadowColor: '#7e7e7e',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderRadius: 3,
    },
    cardHeader: {
        flexDirection: "row"
    },
    skills: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    skillText: {
        textTransform: "uppercase",
        fontSize: 12,
        marginRight: 5
    },
    cardHeaderImage: {
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 50
    },
    cardHeaderText: {
        marginTop: 2,
        fontSize: 15,
        fontWeight: "bold",
        color: "#565656"
    },
    cardStatus: {
        fontWeight: "normal",
        fontSize: 13,
        color: "#565656"
    },
    cardLink: {
        marginTop: 10
    },
})

export default ProfileCard;