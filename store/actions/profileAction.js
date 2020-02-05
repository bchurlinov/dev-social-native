import axios from "axios";
import { loadUser } from "./authAction";
import { LOAD_PROFILES, ADD_PROFILE } from "./types";
import { url } from "../../config/utilities";

export const loadProfiles = (status = "", skills = "", location = "") => {
    return async (dispatch) => {
        try {

            const profiles = await axios.get(`${url}/profile?status=${status}&skills=${skills}&location=${location.toLowerCase()}`);
            console.log(11);

            dispatch({
                type: LOAD_PROFILES,
                payload: profiles.data
            })

        } catch (err) {
            console.log(err.response);
        }
    }
};

export const addProfile = profile => {
    return async (dispatch) => {
        try {

            const userProfile = {
                status: profile.status,
                website: profile.website,
                location: profile.location.toLowerCase(),
                bio: profile.bio,
                skills: profile.skills.toString(),
                facebook: "http://facebook.com/",
                twitter: "http://twitter.com/",
                github: "http://github.com/",
                linkedin: "http://linkedin.com/",
                youtube: "http://youtube.com/",
                instagram: "http://instagram.com/"
            }

            const profileCreation = await axios.post(`${url}/profile`, userProfile);
            await axios.post(`${url}/auth/edituser`);

            dispatch(loadUser());
            dispatch(loadProfiles());

        } catch (err) {
            console.log(err);
        }
    }
}


