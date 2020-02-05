import { LOAD_PROFILES } from "../actions/types";

const initialState = {
    profiles: []
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PROFILES:
            return {
                ...state,
                profiles: action.payload
            }
        default:
            return state;
    }
}

export default profileReducer