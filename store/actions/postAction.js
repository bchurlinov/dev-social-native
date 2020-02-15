import axios from "axios";
import { url } from "../../config/utilities";
import { LOAD_TOPICS, ADD_LIKE } from "./types";

export const loadTopics = () => {
    return async (dispatch) => {
        try {

            const topics = await axios.get(`${url}/posts`);
            dispatch({
                type: LOAD_TOPICS,
                payload: topics.data
            });

        } catch (err) {
            console.log(err);
        }
    }
}

export const addLike = likeId => {
    return async (dispatch) => {
        try {

            const topicLiked = await axios.post(`${url}/posts/likes/${likeId}`);
            dispatch(loadTopics());

        } catch (err) {
            console.log(err.response);
        }
    }
}

export const addUnlike = unlikeId => {
    return async (dispatch) => {
        try {

            const topicUnliked = await axios.post(`${url}/posts/unlikes/${unlikeId}`);
            dispatch(loadTopics());

        } catch (err) {
            console.log(err.response);
        }
    }
}