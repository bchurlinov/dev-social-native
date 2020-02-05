import React, { useState } from "react";
import { connect } from "react-redux";
import { addProfile } from "../../store/actions/profileAction";
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import globalStyles from "../../styles/styles";
import { MultipleSelectPicker } from "react-native-multi-select-picker";
import { Button, Select } from "@ui-kitten/components"
import _ from "lodash";
import { withNavigation } from "react-navigation";

const AddProfile = ({ addProfile, userData, navigation }) => {

    if (userData.profile) {
       navigation.navigate("Home")
    }

    const [multiPicker, setMultiPicker] = useState({ isVisible: false });
    const [inputs, setInputs] = useState({
        status: "",
        skills: [],
        skillsSelect: [],
        website: "",
        location: "",
        bio: ""
    });

    const singleSelect = (value, type) => {
        setInputs({
            ...inputs,
            [type]: value.value
        })
    }

    const selectHandler = (value, type) => {
        const skillsArr = [];

        _.map(value, item => {
            skillsArr.push(item.value)
        })
        setInputs({
            ...inputs,
            [type]: skillsArr,
            skillsSelect: value
        })
    }

    const inputHandler = (value, type) => {
        setInputs({
            ...inputs,
            [type]: value
        })
    }

    const items = [
        { label: 'HTML5', value: 'html5' },
        { label: 'CSS3', value: 'css3' },
        { label: 'Javascript', value: 'javascript' },
        { label: 'Jquery', value: 'jquery' },
        { label: 'React.js', value: 'react' },
        { label: 'Angular.js', value: 'angular' },
        { label: 'Vue.js', value: 'vue' },
        { label: 'Node.js', value: 'node' },
        { label: 'PHP', value: 'php' },
        { label: 'Python', value: 'python' },
        { label: 'Bootstrap', value: 'bootstrap' },
        { label: 'Foundation', value: 'foundation' },
        { label: 'Ruby', value: 'ruby' },
        { label: 'SCSS/SASS', value: 'scss' },
        { label: 'Java', value: 'Java' },
        { label: 'Swift', value: 'Swift' }
    ]

    const status = [
        { text: "Front End Developer", value: "front_end" },
        { text: "Back End Developer", value: "back_end" },
        { text: "Full Stack Developer", value: "full_stack" }
    ]

    const submitProfile = () => {
        addProfile(inputs)
    }

    return (
        <View style={{ flex: 1, padding: 25, backgroundColor: "#ffff" }}>
            <ScrollView>
                <Text style={styles.header}>Create your Profile</Text>
                <Text style={styles.subHeader}>
                    <Icon name="user" size={17} color="#1890ff" />{"   "}
                    Let's get some information to make your profile stand out
                </Text>

                <View style={styles.inputsContainer}>
                    <Text style={styles.label}>What type of developer are you ? ?</Text>
                    <Select
                        data={status}
                        selectedOption={inputs.status}
                        onSelect={(value) => singleSelect(value, "status")}
                        placeholder='Choose from the options'
                    />
                </View>

                <View style={styles.inputsContainer}>
                    <Text style={styles.label}>What type of skills do you poses as a developer ?</Text>
                    <ScrollView>
                        <TouchableOpacity
                            onPress={() => {
                                setMultiPicker({
                                    ...multiPicker,
                                    isVisible: !multiPicker.isVisible
                                });
                            }}
                            style={globalStyles.input}
                        >
                            <Text style={{ textAlign: "left", position: "absolute", left: 10, top: 8, fontSize: 15, color: "#8F9BB3" }}>
                                Select at least one skill {" "} {multiPicker.isVisible && <Icon name="times" size={18} color="#1890ff" />}
                            </Text>
                        </TouchableOpacity>
                        {multiPicker.isVisible ? <MultipleSelectPicker
                            items={items}
                            onSelectionsChange={(ele) => selectHandler(ele, "skills")}
                            selectedItems={inputs.skills}
                            buttonStyle={{ height: 100, justifyContent: 'center', alignItems: 'center' }}
                            buttonText='hello'
                            checkboxStyle={{ height: 20, width: 20 }}
                        />
                            : null
                        }

                        <View style={{ marginTop: 5 }}>
                            <ScrollView horizontal={true} style={{ flexDirection: "row" }}>
                                {(inputs.skillsSelect || []).map((item, index) => {
                                    return <Text key={index} style={{ marginRight: 10 }}>
                                        <Icon name="check" size={15} color="#1890ff" />{""} {item.label}
                                    </Text>
                                })}
                            </ScrollView>
                        </View>
                    </ScrollView>
                </View>

                <View style={styles.inputsContainer}>
                    <View>
                        <Text style={styles.label}>Please share a link to your personal website</Text>
                        <TextInput
                            style={globalStyles.input}
                            onChangeText={(text) => inputHandler(text, "website")}
                            value={inputs.website}
                            placeholder="example: https://www.bojanchurlinov.com"
                        />
                    </View>
                </View>

                <View style={styles.inputsContainer}>
                    <View>
                        <Text style={styles.label}>Where do you live ?</Text>
                        <TextInput
                            style={globalStyles.input}
                            onChangeText={(text) => inputHandler(text, "location")}
                            value={inputs.location}
                            placeholder="example: Ohrid"
                        />
                    </View>
                </View>

                <View style={styles.inputsContainer}>
                    <View>
                        <Text style={styles.label}>A short bio of yourself ?</Text>
                        <TextInput
                            style={globalStyles.input}
                            onChangeText={(text) => inputHandler(text, "bio")}
                            value={inputs.bio}
                            multiline={true}
                            numberOfLines={10}
                            placeholder="Tell us something about yourself"
                        />
                    </View>
                </View>

                <View style={styles.inputsContainer}>
                    <Button status="info" onPress={() => submitProfile()} size="small">
                        Submit Profile
                    </Button>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        textAlign: "center",
        color: "#1890ff",
        fontSize: 20,
        marginBottom: 10
    },
    subHeader: {
        fontSize: 13,
        color: "#565656",
        textAlign: "center"
    },
    inputsContainer: {
        marginTop: 40,
        flexDirection: "column"
    },
    label: {
        fontSize: 13,
        color: "gray",
        marginBottom: 3,
        fontStyle: "italic"
    }
});

const mapStateToProps = state => {
    console.log(state);
    return {
        userData: state.auth.userData,
    }
}

export default withNavigation(connect(mapStateToProps, { addProfile })(AddProfile));