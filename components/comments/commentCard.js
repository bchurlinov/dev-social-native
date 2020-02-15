import React, { useState } from "react";
import { connect } from "react-redux";
import { addLike, addUnlike } from "../../store/actions/postAction";
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import _ from "lodash";

const CommentCard = ({ topic, user, screenWidth, navigation, addLike, addUnlike }) => {

    let width = Dimensions.get('window').width;

    const setCommentDate = date => {
        return moment(date).format("DD-MMM-YYYY");
    }

    const navToDiscussion = () => {
        navigation.navigate("Discussion");
    }

    const addLikes = likeId => {
        addLike(likeId)
    }

    const addUnlikes = likeId => {
        addUnlike(likeId)
    }

    const renderTopics = () => {
        return (
            <View style={styles.cardInnerWrap}>
                <View>
                    <Image style={styles.commentProfileImage} source={{ uri: topic.avatar }} />
                    <Text style={{ textAlign: "center", color: "#565656", fontWeight: "bold" }}>{topic.name}</Text>
                </View>
                <View style={styles.commentsContent}>
                    <Text style={styles.comment}>{topic.text}</Text>
                    <Text style={styles.datePosted}><Text style={{ fontWeight: "bold" }}>
                        Posted on:
                        </Text> {setCommentDate(topic.date)}</Text>
                    <View style={{ flexDirection: "row", marginTop: 15, position: "absolute", bottom: -30, left: 10 }}>
                        <View>
                            {renderLikeUnlikeButton(topic.likes)}
                        </View>
                        <TouchableOpacity onPress={navToDiscussion}>
                            <View style={styles.actionButton}>
                                <Text style={{ color: "#ffff", fontSize: 12 }}>Discussion</Text>
                                <Text style={{ marginLeft: 10, color: "#1890ff", backgroundColor: "#ffff", paddingHorizontal: 3, borderRadius: 1 }}>
                                    {topic.comments.length}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    const renderLikeUnlikeButton = likes => {
        return likes && _.find(likes, item => item.user === user._id)
            ?

            <View>
                <TouchableOpacity style={styles.contentActions} onPress={() => addUnlikes(topic._id)}>
                    <View style={styles.actionButtonLiked}>
                        <Text style={{ marginLeft: 5, color: "#1890ff" }}>
                            <Icon name="thumbs-up" size={16} color="#1890ff" />{"  "}{topic.likes.length}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            :

            <View>
                <TouchableOpacity style={styles.contentActions} onPress={() => addLikes(topic._id)}>
                    <View style={styles.actionButton}>
                        <Text style={{ marginLeft: 5, color: "white" }}>
                            <Icon name="thumbs-up" size={16} color="white" />{"  "}{topic.likes.length}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
    }

    return (
        <View style={{ width: width / screenWidth }}>
            <View style={styles.cardContainer}>
                {renderTopics()}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        borderWidth: 1,
        borderColor: "#e0e0e0",
        marginRight: 15,
        padding: 15,
        paddingRight: 45,
        elevation: 1,
        shadowColor: '#7e7e7e',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderRadius: 3,
        height: 140
    },
    cardInnerWrap: {
        flexDirection: "row"
    },
    commentProfileImage: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginBottom: 5,
        marginTop: 10
    },
    commentsContent: {
        padding: 10,
    },
    comment: {
        color: "#565656",
        fontSize: 13
    },
    datePosted: {
        fontSize: 12,
        marginTop: 2,
        color: "#7e7e7e"
    },
    contentActions: {
        marginRight: 10,
    },
    actionButton: {
        backgroundColor: "#1890ff",
        paddingHorizontal: 15,
        paddingVertical: 5,
        color: "#ffff",
        borderRadius: 3,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    actionButtonLiked: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 4,
        color: "#ffff",
        borderRadius: 3,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#1890ff"
    }
});

const mapStateToProps = state => {
    return {
        top: state.post.topics
    }
}


export default withNavigation(connect(mapStateToProps, { addLike, addUnlike })(CommentCard));