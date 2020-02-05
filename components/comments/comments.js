import React from "react";
import { connect } from "react-redux";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import CommentCard from "./commentCard";
import map from "lodash/map";

const Comments = ({ topics }) => {


    const renderTopics = () => {
        return topics && map(topics, (topic, index) => {
            return (
                <View style={{ marginBottom: 25 }} key={index}>
                    <CommentCard
                        topic={topic}
                        screenWidth={1.1}
                    />
                </View>
            )
        })
    }

    return (
        <ScrollView style={{ padding: 20 }}>
            <View style={{ flex: 1 }}>
                <Text style={styles.topicsHeader}>
                    Latest Topics
                </Text>
                {renderTopics()}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    topicsHeader: {
        textAlign: "center",
        fontSize: 19,
        marginBottom: 20
    }
})

const mapStateToProps = state => {
    return {
        topics: state.post.topics
    }
}

export default connect(mapStateToProps, null)(Comments);