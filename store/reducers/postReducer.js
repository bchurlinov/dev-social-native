import { LOAD_TOPICS } from "../actions/types";

const initialState = {
    topics: []
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_TOPICS:
            return {
                ...state,
                topics: action.payload
            }
        default:
            return state;
    }
}

export default postReducer;