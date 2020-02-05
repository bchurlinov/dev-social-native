import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
   auth: authReducer,
   profile: profileReducer,
   post: postReducer
});

export default rootReducer;