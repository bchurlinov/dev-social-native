import axios from "axios";
import { url } from "../../config/utilities";
import { LOAD_TOPICS } from "./types";

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