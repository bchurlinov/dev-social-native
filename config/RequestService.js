import axios from "axios";

export const requestInterceptor = async (token) => {
    return (
        axios.interceptors.request.use(
            config => {
                if (token) {
                    config.headers['x-auth-token'] = `${token}`;
                } else {
                    delete config.headers.common["Authorization"]
                }

                config.headers['Content-Type'] = 'application/json';

                return config;
            },
            error => {
                Promise.reject(error)
            })
    )
};
